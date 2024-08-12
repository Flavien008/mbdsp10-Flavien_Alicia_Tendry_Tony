package com.example.tpt_mbds;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

public class ProfileActivity extends AppCompatActivity {

    private EditText nameEditText;
    private EditText birthdateEditText;
    private EditText emailEditText;
    private EditText passwordEditText;
    private EditText confirmPasswordEditText;
    private Button modifyButton;
    private Button cancelButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ImageView backArrow = findViewById(R.id.back_arrow);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Fermer cette activité et revenir à la précédente
            }
        });

        ImageView homeIcon = findViewById(R.id.home_icon);
        homeIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Code pour aller à l'accueil
            }
        });

        nameEditText = findViewById(R.id.name);
        birthdateEditText = findViewById(R.id.birthdate);
        emailEditText = findViewById(R.id.email);
        passwordEditText = findViewById(R.id.password);
        confirmPasswordEditText = findViewById(R.id.confirm_password);
        modifyButton = findViewById(R.id.modify_button);
        cancelButton = findViewById(R.id.cancel_button);

        modifyButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Code pour modifier les informations du profil
            }
        });

        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Fermer cette activité et revenir à la précédente
            }
        });
    }
}
