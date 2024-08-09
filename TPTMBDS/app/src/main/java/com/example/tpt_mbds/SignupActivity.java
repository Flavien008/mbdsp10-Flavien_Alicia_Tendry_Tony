package com.example.tpt_mbds;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.service.UserService;

import org.json.JSONObject;

public class SignupActivity extends AppCompatActivity {

    private EditText nameEditText;
    private EditText birthdateEditText;
    private EditText emailEditText;
    private EditText passwordEditText;
    private EditText confirmPasswordEditText;
    private Button signupButton;
    private Button cancelButton;
    private UserService userService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ImageView backArrow = findViewById(R.id.back_arrow);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Close this activity and return to the previous one
            }
        });

        nameEditText = findViewById(R.id.name);
        birthdateEditText = findViewById(R.id.birthdate);
        emailEditText = findViewById(R.id.email);
        passwordEditText = findViewById(R.id.password);
        confirmPasswordEditText = findViewById(R.id.confirm_password);
        signupButton = findViewById(R.id.signup_button);
        cancelButton = findViewById(R.id.cancel_button);

        // Initialize UserService
        userService = new UserService(this);

        signupButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                handleSignup();
            }
        });

        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Close this activity and return to the previous one
            }
        });
    }

    private void handleSignup() {
        String username = nameEditText.getText().toString().trim();
        String email = emailEditText.getText().toString().trim();
        String dateNaissance = birthdateEditText.getText().toString().trim();
        String password = passwordEditText.getText().toString().trim();
        String confirmPassword = confirmPasswordEditText.getText().toString().trim();

        if (!password.equals(confirmPassword)) {
            Toast.makeText(this, "Les mots de passe ne correspondent pas", Toast.LENGTH_SHORT).show();
            return;
        }

        userService.signup(username, email, dateNaissance, 2, password, new UserService.SignupCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                // Handle success, e.g., navigate to another activity or show a success message
                Toast.makeText(SignupActivity.this, "Inscription réussie", Toast.LENGTH_SHORT).show();
                finish(); // Close this activity
            }

            @Override
            public void onError(VolleyError error) {
                // Handle error, e.g., show an error message
                Toast.makeText(SignupActivity.this, "Erreur lors de l'inscription", Toast.LENGTH_SHORT).show();
                Log.e("SignupError", error.toString());
            }
        });
    }
}
