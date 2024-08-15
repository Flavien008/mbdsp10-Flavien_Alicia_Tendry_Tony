package com.example.tpt_mbds;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
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

public class PostActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private PostAdapter adapter;
    private List<Post> postList;
    private ImageView searchIcon, addIcon;
    private PostService postService;
    private int currentPage = 1;
    private boolean isLoading = false;
    private boolean hasMoreData = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);

        recyclerView = findViewById(R.id.recycler_view);
        GridLayoutManager layoutManager = new GridLayoutManager(this, 2);
        recyclerView.setLayoutManager(layoutManager);

        searchIcon = findViewById(R.id.search_icon);
        addIcon = findViewById(R.id.add_icon);

        searchIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(PostActivity.this, SearchActivity.class);
                startActivity(intent);
            }
        });

        addIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(PostActivity.this, AddPostActivity.class);
                startActivity(intent);
            }
        });

        // Initialize the post list
        postList = new ArrayList<>();

        // Initialize PostService
        postService = new PostService(this);

        // Show loading spinner before fetching posts
        showLoading();

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
                        adapter = new PostAdapter(postList, PostActivity.this);
                        recyclerView.setAdapter(adapter);
                    } else {
                        adapter.notifyDataSetChanged();
                    }

                    isLoading = false;

                    // Determine if there are more pages to load
                    hasMoreData = response.getBoolean("hasNext");

                    // Hide loading spinner after posts are loaded
                    hideLoading();

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(PostActivity.this, "Erreur lors du traitement des données", Toast.LENGTH_SHORT).show();
                    isLoading = false;
                    hideLoading();  // Hide loading even if there's an error
                }
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(PostActivity.this, "Erreur lors de la récupération des posts", Toast.LENGTH_SHORT).show();
                isLoading = false;
                hideLoading();  // Hide loading even if there's an error
            }
        });
    }

    private void showLoading() {
        findViewById(R.id.loading_layout).setVisibility(View.VISIBLE);
        findViewById(R.id.recycler_view).setVisibility(View.GONE);
    }

    private void hideLoading() {
        findViewById(R.id.loading_layout).setVisibility(View.GONE);
        findViewById(R.id.recycler_view).setVisibility(View.VISIBLE);
    }
}
