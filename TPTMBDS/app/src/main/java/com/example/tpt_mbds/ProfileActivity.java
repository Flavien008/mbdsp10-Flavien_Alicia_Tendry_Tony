package com.example.tpt_mbds;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.service.UserService;
import com.example.tpt_mbds.service.TokenManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class ProfileActivity extends AppCompatActivity {

    private EditText nameEditText;
    private EditText birthdateEditText;
    private EditText emailEditText;
    private EditText passwordEditText;
    private EditText confirmPasswordEditText;
    private Button modifyButton;
    private Button cancelButton;
    private UserService userService;
    private Calendar birthdateCalendar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ImageView backArrow = findViewById(R.id.back_arrow);
        backArrow.setOnClickListener(v -> finish());

        ImageView homeIcon = findViewById(R.id.home_icon);
        homeIcon.setOnClickListener(v -> {
            // Code pour aller à l'accueil
        });

        nameEditText = findViewById(R.id.name);
        birthdateEditText = findViewById(R.id.birthdate);
        emailEditText = findViewById(R.id.email);
        passwordEditText = findViewById(R.id.password);
        confirmPasswordEditText = findViewById(R.id.confirm_password);
        modifyButton = findViewById(R.id.modify_button);
        cancelButton = findViewById(R.id.cancel_button);

        userService = new UserService(this);
        birthdateCalendar = Calendar.getInstance();

        // Charger les informations de l'utilisateur
        loadUserInfo();

        // Set up the DatePickerDialog for birthdate
        birthdateEditText.setOnClickListener(v -> showDatePickerDialog());

        modifyButton.setOnClickListener(v -> {
            if (validateInput()) {
                updateUser();
            } else {
                Toast.makeText(ProfileActivity.this, "Veuillez vérifier les informations saisies", Toast.LENGTH_SHORT).show();
            }
        });

        cancelButton.setOnClickListener(v -> finish());
    }

    private void loadUserInfo() {
        int userId = TokenManager.getInstance(this).getUserId();

        userService.getUserInfo(userId, new UserService.UserInfoCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                try {
                    nameEditText.setText(response.getString("username"));
                    birthdateEditText.setText(response.getString("dateNaissance").substring(0, 10));
                    emailEditText.setText(response.getString("email"));
                    passwordEditText.setText("********"); // Placeholder, ne pas afficher le vrai mot de passe
                    confirmPasswordEditText.setText("********"); // Placeholder
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(ProfileActivity.this, "Erreur lors du traitement des données", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(ProfileActivity.this, "Erreur lors de la récupération des informations", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void showDatePickerDialog() {
        new DatePickerDialog(ProfileActivity.this, (view, year, monthOfYear, dayOfMonth) -> {
            birthdateCalendar.set(Calendar.YEAR, year);
            birthdateCalendar.set(Calendar.MONTH, monthOfYear);
            birthdateCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
            updateBirthdateLabel();
        }, birthdateCalendar.get(Calendar.YEAR), birthdateCalendar.get(Calendar.MONTH), birthdateCalendar.get(Calendar.DAY_OF_MONTH)).show();
    }

    private void updateBirthdateLabel() {
        String myFormat = "yyyy-MM-dd"; // Format de date choisi
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.US);
        birthdateEditText.setText(sdf.format(birthdateCalendar.getTime()));
    }

    private boolean validateInput() {
        String password = passwordEditText.getText().toString();
        String confirmPassword = confirmPasswordEditText.getText().toString();

        return !nameEditText.getText().toString().isEmpty() &&
                !birthdateEditText.getText().toString().isEmpty() &&
                !emailEditText.getText().toString().isEmpty() &&
                password.equals(confirmPassword);
    }

    private void updateUser() {
        int userId = TokenManager.getInstance(this).getUserId();
        String name = nameEditText.getText().toString();
        String birthdate = birthdateEditText.getText().toString();
        String email = emailEditText.getText().toString();
        String password = passwordEditText.getText().toString().equals("********") ? null : passwordEditText.getText().toString();

        userService.updateUser(userId, name, email, birthdate, password, new UserService.UserUpdateCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                Toast.makeText(ProfileActivity.this, "Profil mis à jour avec succès", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(ProfileActivity.this, "Erreur lors de la mise à jour du profil", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
