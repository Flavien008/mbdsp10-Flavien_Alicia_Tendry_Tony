package com.example.tpt_mbds;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.ImageView;

public class SearchObjetActivity extends AppCompatActivity {

    private EditText nomEditText;
    private EditText descriptionEditText;
    private EditText categorieEditText;
    private Button rechercherButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_objet);

        nomEditText = findViewById(R.id.nom_edit_text);
        descriptionEditText = findViewById(R.id.description_edit_text);
        categorieEditText = findViewById(R.id.categorie_edit_text);
        rechercherButton = findViewById(R.id.rechercher_button);

        rechercherButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Implémentez votre logique de recherche ici
            }
        });

        // Handle back button
        ImageView backArrow = findViewById(R.id.back_arrow);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        // Handle home button
        ImageView homeIcon = findViewById(R.id.home_icon);
        homeIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SearchObjetActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });

        
    }
}
