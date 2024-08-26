package com.example.tpt_mbds;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.adapteur.PostAdapter;
import com.example.tpt_mbds.model.Post;
import com.example.tpt_mbds.service.PostService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class AllPostsFragment extends Fragment {

    private RecyclerView recyclerView;
    private PostAdapter adapter;
    private List<Post> postList;
    private PostService postService;
    private int currentPage = 1;
    private boolean isLoading = false;
    private boolean hasMoreData = true;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_all_posts, container, false);

        recyclerView = view.findViewById(R.id.recycler_view);
        GridLayoutManager layoutManager = new GridLayoutManager(getContext(), 2);
        recyclerView.setLayoutManager(layoutManager);

        // Initialize the post list
        postList = new ArrayList<>();

        // Initialize PostService
        postService = new PostService(getContext());

        // Fetch and populate the first page
        fetchPostList(currentPage);

        // Set up infinite scroll
        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);

                int visibleItemCount = layoutManager.getChildCount();
                int totalItemCount = layoutManager.getItemCount();
                int firstVisibleItemPosition = layoutManager.findFirstVisibleItemPosition();

                if (!isLoading && hasMoreData) {
                    if ((visibleItemCount + firstVisibleItemPosition) >= totalItemCount && firstVisibleItemPosition >= 0) {
                        currentPage++;
                        fetchPostList(currentPage);
                    }
                }
            }
        });

        return view;
    }

    private void fetchPostList(int page) {
        isLoading = true;
        postService.fetchPosts(page, 10, new PostService.FetchPostsCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                try {
                    JSONArray dataArray = response.getJSONArray("data");
                    for (int i = 0; i < dataArray.length(); i++) {
                        JSONObject postData = dataArray.getJSONObject(i);

                        int postId = postData.getInt("poste_id");
                        String title = postData.getString("titre");
                        String author = postData.getJSONObject("Utilisateur").getString("username");
                        String description = postData.getString("description");
                        String location = postData.getString("longitude") + ", " + postData.getString("latitude");  // Combine longitude and latitude
                        String category = "Non spécifié";  // Placeholder for category, not directly available in the response

                        // Retrieve the last image from the associated object (if any)
                        String imageBase64 = null;
                        JSONArray postDetailsArray = postData.getJSONArray("Postedetails");
                        if (postDetailsArray.length() > 0) {
                            JSONObject lastPostDetail = postDetailsArray.getJSONObject(postDetailsArray.length() - 1);
                            JSONObject objet = lastPostDetail.getJSONObject("Objet");
                            JSONArray imagesArray = objet.getJSONArray("images");
                            if (imagesArray.length() > 0) {
                                imageBase64 = imagesArray.getJSONObject(imagesArray.length() - 1).getString("img");
                            }
                            category = objet.getJSONObject("Categorie").getString("nom");  // Retrieve category from the associated object
                        }

                        Post post = new Post(postId, title, author, category, description, location, imageBase64);
                        postList.add(post);
                    }

                    if (adapter == null) {
                        adapter = new PostAdapter(postList, getContext());
                        recyclerView.setAdapter(adapter);
                    } else {
                        adapter.notifyDataSetChanged();
                    }

                    isLoading = false;

                    // Determine if there are more pages to load
                    hasMoreData = response.getBoolean("hasNext");

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(getContext(), "Erreur lors du traitement des données", Toast.LENGTH_SHORT).show();
                    isLoading = false;
                }
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(getContext(), "Erreur lors de la récupération des posts", Toast.LENGTH_SHORT).show();
                isLoading = false;
            }
        });
    }
}
