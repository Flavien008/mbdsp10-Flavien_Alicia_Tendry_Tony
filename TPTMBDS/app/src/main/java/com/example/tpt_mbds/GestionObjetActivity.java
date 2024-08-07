package com.example.tpt_mbds;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.adapteur.ObjetAdapter;
import com.example.tpt_mbds.model.Objet;

import java.util.ArrayList;
import java.util.List;

public class GestionObjetActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private ObjetAdapter adapter;
    private List<Objet> objetList;
    private ImageView searchIcon, addIcon;

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

        // Initialiser la liste des objets (vous pouvez charger les données dynamiquement)
        objetList = new ArrayList<>();
        populateObjetList();

        // Initialiser l'adaptateur
        adapter = new ObjetAdapter(this, objetList);
        recyclerView.setAdapter(adapter);
    }

    private void populateObjetList() {
        objetList.clear();
        objetList.add(new Objet("Nom de l'objet 1", "Catégorie 1", "Description de l'objet 1"));
        objetList.add(new Objet("Nom de l'objet 2", "Catégorie 2", "Description de l'objet 2"));
        objetList.add(new Objet("Nom de l'objet 3", "Catégorie 3", "Description de l'objet 3"));
        objetList.add(new Objet("Nom de l'objet 4", "Catégorie 4", "Description de l'objet 4"));
    }
}
