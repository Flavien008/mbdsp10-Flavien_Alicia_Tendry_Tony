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
import com.example.tpt_mbds.adapteur.ObjetAdapter;
import com.example.tpt_mbds.model.Objet;
import com.example.tpt_mbds.service.ObjetService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class GestionObjetActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private ObjetAdapter adapter;
    private List<Objet> objetList;
    private ImageView searchIcon, addIcon;
    private ObjetService objetService;
    private int currentPage = 1;
    private boolean isLoading = false;
    private boolean hasMoreData = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gestion_objet);

        recyclerView = findViewById(R.id.recycler_view);
        GridLayoutManager layoutManager = new GridLayoutManager(this, 2);
        recyclerView.setLayoutManager(layoutManager);

        searchIcon = findViewById(R.id.search_icon);
        addIcon = findViewById(R.id.add_icon);

        searchIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(GestionObjetActivity.this, SearchObjetActivity.class);
                startActivity(intent);
            }
        });

        addIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(GestionObjetActivity.this, AddObjetActivity.class);
                startActivity(intent);
            }
        });

        // Initialize the object list
        objetList = new ArrayList<>();

        // Initialize ObjetService
        objetService = new ObjetService(this);

        // Fetch and populate the first page
        fetchObjetList(currentPage);

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
                        fetchObjetList(currentPage);
                    }
                }
            }
        });
    }

    private void fetchObjetList(int page) {
        isLoading = true;
        objetService.fetchObjets(page, 10, new ObjetService.FetchObjetsCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                try {
                    JSONArray dataArray = response.getJSONArray("data");
                    for (int i = 0; i < dataArray.length(); i++) {
                        JSONObject objectData = dataArray.getJSONObject(i);

                        int itemId = objectData.getInt("item_id");
                        String name = objectData.getString("name");
                        String description = objectData.getString("description");
                        String categorie = objectData.getJSONObject("Categorie").getString("nom");
                        String imageBase64 = objectData.getJSONArray("images").getJSONObject(0).getString("img");

                        Objet objet = new Objet(itemId, name, categorie, description, imageBase64);
                        objetList.add(objet);
                    }

                    if (adapter == null) {
                        adapter = new ObjetAdapter(GestionObjetActivity.this, objetList);
                        recyclerView.setAdapter(adapter);
                    } else {
                        adapter.notifyDataSetChanged();
                    }

                    isLoading = false;

                    // Determine if there are more pages to load
                    hasMoreData = !response.getBoolean("hasNext");

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(GestionObjetActivity.this, "Erreur lors du traitement des données", Toast.LENGTH_SHORT).show();
                    isLoading = false;
                }
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(GestionObjetActivity.this, "Erreur lors de la récupération des objets", Toast.LENGTH_SHORT).show();
                isLoading = false;
            }
        });
    }
}
