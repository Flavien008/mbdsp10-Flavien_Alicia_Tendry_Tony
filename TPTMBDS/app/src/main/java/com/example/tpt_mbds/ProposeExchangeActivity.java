package com.example.tpt_mbds;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

import com.example.tpt_mbds.model.Objet;

import java.util.ArrayList;
import java.util.List;

public class ProposeExchangeActivity extends AppCompatActivity {

    private Spinner objectSpinner;
    private ImageView backArrow;
    private ImageView homeIcon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_propose_exchange);

        objectSpinner = findViewById(R.id.object_spinner);

        // Créer une liste d'objets
        List<Objet> objets = new ArrayList<>();
//        objets.add(new Objet("Objet 1","category1","jadyfvhwapdoisv"));
//        objets.add(new Objet("Objet 2","category1","jadyfvhwapdoisv"));
//        objets.add(new Objet("Objet 3","category1","jadyfvhwapdoisv"));

        // Créer un ArrayAdapter pour le Spinner
        ArrayAdapter<Objet> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, objets);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        // Assigner l'adaptateur au Spinner
        objectSpinner.setAdapter(adapter);

//        backArrow.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                onBackPressed(); // Retourner à l'activité précédente
//            }
//        });
        // Définir l'action du bouton home
//        homeIcon.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent(ProposeExchangeActivity.this, MainActivity.class);
//                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK); // Efface les autres activités
//                startActivity(intent);
//                finish(); // Fermer l'activité actuelle
//            }
//        });
    }
}
