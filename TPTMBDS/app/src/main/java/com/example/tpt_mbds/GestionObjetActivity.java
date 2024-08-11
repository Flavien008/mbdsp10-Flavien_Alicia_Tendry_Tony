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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gestion_objet);

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new GridLayoutManager(this, 2));

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

        // Fetch and populate the list from the API
        fetchObjetList();
    }

    private void fetchObjetList() {
        objetService.fetchObjets(1, 10, new ObjetService.FetchObjetsCallback() {
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

                    // Initialize the adapter with the fetched data
                    adapter = new ObjetAdapter(GestionObjetActivity.this, objetList);
                    recyclerView.setAdapter(adapter);

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(GestionObjetActivity.this, "Erreur lors du traitement des données", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(GestionObjetActivity.this, "Erreur lors de la récupération des objets", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
