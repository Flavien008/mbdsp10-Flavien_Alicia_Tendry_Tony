package com.example.tpt_mbds;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.service.ObjetService;
import com.example.tpt_mbds.service.PostService;
import com.example.tpt_mbds.service.TokenManager;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class AddPostActivity extends AppCompatActivity {

    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;

    private EditText titleEditText;
    private EditText descriptionEditText;
    private EditText locationEditText;
    private Spinner objectSpinner;
    private Button validateButton;
    private PostService postService;
    private FusedLocationProviderClient fusedLocationClient;

    private double currentLongitude = 0.0;
    private double currentLatitude = 0.0;
    private int selectedObjectId = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_post);

        // Initialiser les vues
        titleEditText = findViewById(R.id.title);
        descriptionEditText = findViewById(R.id.description);
        locationEditText = findViewById(R.id.location);
        objectSpinner = findViewById(R.id.object_spinner);
        validateButton = findViewById(R.id.validate_button);

        // Initialisation du service de post
        postService = new PostService(this);

        // Initialiser le client de localisation
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        getLocation();

        // Configuration du bouton de retour
        ImageView backArrow = findViewById(R.id.back_arrow);
        backArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Fermer cette activité et revenir à la précédente
            }
        });

        // Configuration du bouton Home
        ImageView homeIcon = findViewById(R.id.home_icon);
        homeIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AddPostActivity.this, MainActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
            }
        });

        // Charger les objets depuis l'API et remplir le Spinner
        loadObjects();

        // Gestion du bouton Valider
        validateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                handlePostCreation();
            }
        });
    }

    private void getLocation() {
        // Vérifier les permissions
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
            return;
        }

        // Obtenir la dernière localisation connue
        fusedLocationClient.getLastLocation()
                .addOnCompleteListener(new OnCompleteListener<Location>() {
                    @Override
                    public void onComplete(@NonNull Task<Location> task) {
                        if (task.isSuccessful() && task.getResult() != null) {
                            Location location = task.getResult();
                            currentLongitude = location.getLongitude();
                            currentLatitude = location.getLatitude();
                            locationEditText.setText("Longitude: " + currentLongitude + ", Latitude: " + currentLatitude);
                        } else {
                            Toast.makeText(AddPostActivity.this, "Impossible d'obtenir la localisation actuelle", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
    }
    private void loadObjects() {
        ObjetService objetService = new ObjetService(this);
        objetService.fetchObjets(1, 100, new ObjetService.FetchObjetsCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                try {
                    JSONArray dataArray = response.getJSONArray("data");
                    List<String> objectNames = new ArrayList<>();
                    final List<Integer> objectIds = new ArrayList<>();

                    objectNames.add("Choix des objets");  // Ajouter un élément par défaut
                    objectIds.add(-1);  // ID invalide pour l'élément par défaut

                    for (int i = 0; i < dataArray.length(); i++) {
                        JSONObject objectData = dataArray.getJSONObject(i);
                        int itemId = objectData.getInt("item_id");
                        String name = objectData.getString("name");
                        objectNames.add(name);
                        objectIds.add(itemId);
                    }

                    ArrayAdapter<String> adapter = new ArrayAdapter<>(AddPostActivity.this, android.R.layout.simple_spinner_item, objectNames);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    objectSpinner.setAdapter(adapter);

                    objectSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                        @Override
                        public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                            // Vous pouvez stocker l'ID de l'objet sélectionné pour une utilisation ultérieure
                            selectedObjectId = objectIds.get(position);
                        }

                        @Override
                        public void onNothingSelected(AdapterView<?> parent) {
                            selectedObjectId = -1;  // Aucun objet sélectionné
                        }
                    });

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(AddPostActivity.this, "Erreur lors du traitement des données", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(AddPostActivity.this, "Erreur lors de la récupération des objets", Toast.LENGTH_SHORT).show();
            }
        });
    }
    private void handlePostCreation() {
        // Récupérer les données du formulaire
        String title = titleEditText.getText().toString().trim();
        String description = descriptionEditText.getText().toString().trim();
        int userId = TokenManager.getInstance(this).getUserId();

        if (selectedObjectId > 0) { // S'assurer qu'un objet est sélectionné
            // Créer une liste des objets à partir du spinner (doit être dynamique)
            List<Integer> items = new ArrayList<>();
            items.add(selectedObjectId);

            // Appel au service pour ajouter le post
            postService.addPost(userId, title, currentLongitude, currentLatitude, description, false, items, new PostService.AddPostCallback() {
                @Override
                public void onSuccess(JSONObject response) {
                    Toast.makeText(AddPostActivity.this, "Post ajouté avec succès", Toast.LENGTH_SHORT).show();
                    finish(); // Fermer cette activité après le succès
                }

                @Override
                public void onError(VolleyError error) {
                    Toast.makeText(AddPostActivity.this, "Erreur lors de l'ajout du post", Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            Toast.makeText(this, "Veuillez sélectionner un objet", Toast.LENGTH_SHORT).show();
        }
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                getLocation();
            } else {
                Toast.makeText(this, "Permission de localisation refusée", Toast.LENGTH_SHORT).show();
            }
        }
    }
}
