package com.example.tpt_mbds;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

import com.example.tpt_mbds.model.Categorie;

import java.util.ArrayList;
import java.util.List;

public class AddObjetActivity extends AppCompatActivity {

    private EditText nomEditText;
    private EditText descriptionEditText;
    private Spinner categorieSpinner;
    private Button validerButton;
    private List<Categorie> categories;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_objet);

        nomEditText = findViewById(R.id.nom_edit_text);
        descriptionEditText = findViewById(R.id.description_edit_text);
        categorieSpinner = findViewById(R.id.categorie_spinner);
        validerButton = findViewById(R.id.valider_button);

        // Initialiser la liste des catégories
        categories = new ArrayList<>();
        populateCategorieList();

        // Configurer le Spinner
        ArrayAdapter<Categorie> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, categories);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        categorieSpinner.setAdapter(adapter);

        validerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Implémentez votre logique pour valider et ajouter l'objet ici
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
                Intent intent = new Intent(AddObjetActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });
    }

    private void populateCategorieList() {
        categories.add(new Categorie("Catégorie 1"));
        categories.add(new Categorie("Catégorie 2"));
        categories.add(new Categorie("Catégorie 3"));
        // Ajoutez d'autres catégories si nécessaire
    }
}
