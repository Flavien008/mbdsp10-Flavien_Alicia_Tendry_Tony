package com.example.tpt_mbds;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.NestedScrollView;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.model.Objet;
import com.example.tpt_mbds.service.ExchangeService;
import com.example.tpt_mbds.service.ObjetService;
import com.example.tpt_mbds.service.TokenManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class ProposeExchangeActivity extends AppCompatActivity {

    private EditText descriptionEditText;
    private LinearLayout objectsContainer;
    private ImageView backArrow;
    private ImageView homeIcon;
    private ProgressBar progressBar;
    private NestedScrollView nestedScrollView;
    private Button proposeButton;

    private ObjetService objetService;
    private ExchangeService exchangeService;

    private List<Objet> objets = new ArrayList<>();
    private int currentPage = 1;
    private boolean isLoading = false;
    private boolean isLastPage = false;

    private int postId;
    private int responderId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_propose_exchange);

        descriptionEditText = findViewById(R.id.description);
        objectsContainer = findViewById(R.id.objects_container);
        backArrow = findViewById(R.id.back_arrow);
        homeIcon = findViewById(R.id.home_icon);
        progressBar = findViewById(R.id.progressBar);
        nestedScrollView = findViewById(R.id.nested_scroll_view);
        proposeButton = findViewById(R.id.propose_button);

        objetService = new ObjetService(this);
        exchangeService = new ExchangeService(this);

        // Get postId and responderId from Intent extras
        postId = getIntent().getIntExtra("POST_ID", -1);
//        responderId = getIntent().getIntExtra("RESPONDER_ID", -1);
         responderId = TokenManager.getInstance(this).getUserId();
        // Fetch initial data
        fetchObjects(currentPage);

        // Set up infinite scrolling
        nestedScrollView.setOnScrollChangeListener(new NestedScrollView.OnScrollChangeListener() {
            @Override
            public void onScrollChange(NestedScrollView v, int scrollX, int scrollY, int oldScrollX, int oldScrollY) {
                if (scrollY == (v.getChildAt(0).getMeasuredHeight() - v.getMeasuredHeight())) {
                    if (!isLoading && !isLastPage) {
                        currentPage++;
                        fetchObjects(currentPage);
                    }
                }
            }
        });

        // Set up back arrow
        backArrow.setOnClickListener(v -> onBackPressed());

        // Set up home icon action
        homeIcon.setOnClickListener(v -> {
            Intent intent = new Intent(ProposeExchangeActivity.this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK); // Clear other activities
            startActivity(intent);
            finish(); // Close the current activity
        });

        // Set up propose button
        proposeButton.setOnClickListener(v -> submitExchangeProposal());
    }

    private void fetchObjects(int page) {
        isLoading = true;
        progressBar.setVisibility(View.VISIBLE);

        objetService.fetchObjets(page, 10, new ObjetService.FetchObjetsCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                progressBar.setVisibility(View.GONE);
                try {
                    JSONArray objectsArray = response.getJSONArray("data");

                    if (objectsArray.length() > 0) {
                        for (int i = 0; i < objectsArray.length(); i++) {
                            JSONObject jsonObject = objectsArray.getJSONObject(i);
                            int id = jsonObject.getInt("item_id");
                            String name = jsonObject.getString("name");
                            String category = jsonObject.getJSONObject("Categorie").getString("nom");
                            String description = jsonObject.getString("description");

                            Objet objet = new Objet( name, category, description);
                            objets.add(objet);

                            // Create a checkbox for each object and add it to the container
                            CheckBox checkBox = new CheckBox(ProposeExchangeActivity.this);
                            checkBox.setTextColor(Color.WHITE);
                            checkBox.setText(name);
                            checkBox.setTag(id);  // Store the object ID in the tag

// Change the color of the checkbox itself
                            ColorStateList colorStateList = new ColorStateList(
                                    new int[][]{
                                            new int[]{-android.R.attr.state_checked}, // unchecked state
                                            new int[]{android.R.attr.state_checked}   // checked state
                                    },
                                    new int[]{
                                            Color.GRAY,   // color for unchecked state
                                            Color.WHITE   // color for checked state
                                    }
                            );

                            checkBox.setButtonTintList(colorStateList);
                            objectsContainer.addView(checkBox);

                        }
                    } else {
                        isLastPage = true;
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(ProposeExchangeActivity.this, "Erreur lors du traitement des objets", Toast.LENGTH_SHORT).show();
                }
                isLoading = false;
            }

            @Override
            public void onError(VolleyError error) {
                progressBar.setVisibility(View.GONE);
                isLoading = false;
                Toast.makeText(ProposeExchangeActivity.this, "Erreur lors du chargement des objets", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void submitExchangeProposal() {
        String description = descriptionEditText.getText().toString().trim();
        if (description.isEmpty()) {
            Toast.makeText(this, "Veuillez entrer une description", Toast.LENGTH_SHORT).show();
            return;
        }

        List<Integer> selectedObjectIds = new ArrayList<>();
        for (int i = 0; i < objectsContainer.getChildCount(); i++) {
            CheckBox checkBox = (CheckBox) objectsContainer.getChildAt(i);
            if (checkBox.isChecked()) {
                selectedObjectIds.add((Integer) checkBox.getTag());
            }
        }

        if (selectedObjectIds.isEmpty()) {
            Toast.makeText(this, "Veuillez sélectionner au moins un objet", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            JSONObject requestBody = new JSONObject();
            requestBody.put("description", description);
            requestBody.put("status", "pending");
            requestBody.put("post_id", postId);
            requestBody.put("responder_id", responderId);

            JSONArray detailsArray = new JSONArray();
            for (int objectId : selectedObjectIds) {
                JSONObject detail = new JSONObject();
                detail.put("objet_id", objectId);
                detailsArray.put(detail);
            }
            requestBody.put("details", detailsArray);

            exchangeService.createExchange(requestBody, new ExchangeService.CreateExchangeCallback() {
                @Override
                public void onSuccess(JSONObject response) {
                    Toast.makeText(ProposeExchangeActivity.this, "Échange proposé avec succès", Toast.LENGTH_SHORT).show();
                    finish(); // Close the activity after success
                }

                @Override
                public void onError(String message) {
                    Toast.makeText(ProposeExchangeActivity.this, "Erreur lors de la création de l'échange: " + message, Toast.LENGTH_SHORT).show();
                }
            });


        } catch (JSONException e) {
            e.printStackTrace();
            Toast.makeText(this, "Erreur lors de la création de la requête", Toast.LENGTH_SHORT).show();
        }
    }
}
