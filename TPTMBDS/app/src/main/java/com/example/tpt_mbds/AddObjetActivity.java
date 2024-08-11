package com.example.tpt_mbds;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.model.Categorie;
import com.example.tpt_mbds.service.CategorieService;
import com.example.tpt_mbds.service.ObjetService;
import com.example.tpt_mbds.service.TokenManager;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AddObjetActivity extends AppCompatActivity {

    private static final int REQUEST_IMAGE_CAPTURE = 1;
    private static final int REQUEST_IMAGE_PICK = 2;
    private static final int REQUEST_CAMERA_PERMISSION = 100;

    private EditText nomEditText;
    private EditText descriptionEditText;
    private Spinner categorieSpinner;
    private Button validerButton;
    private ImageView takePictureImageView;
    private ImageView uploadPictureImageView;
    private ImageView selectedImageView;
    private Button removeImageButton;

    private List<Categorie> categories;
    private List<String> imagesBase64;
    private String currentPhotoPath;

    private CategorieService categorieService;
    private ObjetService objetService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_objet);

        nomEditText = findViewById(R.id.nom_edit_text);
        descriptionEditText = findViewById(R.id.description_edit_text);
        categorieSpinner = findViewById(R.id.categorie_spinner);
        validerButton = findViewById(R.id.valider_button);
        takePictureImageView = findViewById(R.id.take_picture);
        uploadPictureImageView = findViewById(R.id.upload_picture);
        selectedImageView = findViewById(R.id.selected_image_view);
        removeImageButton = findViewById(R.id.remove_image_button);

        // Initialize services
        categories = new ArrayList<>();
        imagesBase64 = new ArrayList<>();
        categorieService = new CategorieService(this);
        objetService = new ObjetService(this);

        // Fetch categories from API
        fetchCategories();

        validerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                handleAddObject();
            }
        });

        // Handle taking a picture
        takePictureImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (ContextCompat.checkSelfPermission(AddObjetActivity.this, Manifest.permission.CAMERA)
                        != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(AddObjetActivity.this,
                            new String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA_PERMISSION);
                } else {
                    dispatchTakePictureIntent();
                }
            }
        });

        // Handle uploading a picture from the gallery
        uploadPictureImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dispatchPickPictureIntent();
            }
        });

        // Handle removing the selected image
        removeImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                selectedImageView.setImageBitmap(null);
                selectedImageView.setVisibility(View.GONE);
                removeImageButton.setVisibility(View.GONE);
                imagesBase64.clear(); // Clear the image list
                currentPhotoPath = null; // Clear the photo path
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

    private void fetchCategories() {
        categorieService.getCategories(new CategorieService.CategoriesCallback() {
            @Override
            public void onSuccess(JSONArray response) {
                try {
                    for (int i = 0; i < response.length(); i++) {
                        JSONObject categoryObject = response.getJSONObject(i);
                        String categoryName = categoryObject.getString("nom");
                        int categorie_id = categoryObject.getInt("categorie_id");
                        categories.add(new Categorie(categorie_id,categoryName));
                    }
                    // Set up the Spinner after categories are fetched
                    ArrayAdapter<Categorie> adapter = new ArrayAdapter<>(AddObjetActivity.this, android.R.layout.simple_spinner_item, categories);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    categorieSpinner.setAdapter(adapter);
                } catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(AddObjetActivity.this, "Failed to parse categories", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(AddObjetActivity.this, "Failed to fetch categories", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void handleAddObject() {
        int userId = TokenManager.getInstance(this).getUserId();
        int categorieId = categorieSpinner.getSelectedItemPosition() + 1; // Assuming IDs are sequential
        String name = nomEditText.getText().toString().trim();
        String description = descriptionEditText.getText().toString().trim();

        if (imagesBase64.isEmpty()) {
            Toast.makeText(this, "Please add at least one image", Toast.LENGTH_SHORT).show();
            return;
        }

        objetService.addObject(userId, categorieId, name, description, imagesBase64, new ObjetService.AddObjectCallback() {
            @Override
            public void onSuccess(JSONObject response) {
                Toast.makeText(AddObjetActivity.this, "Object added successfully", Toast.LENGTH_SHORT).show();
                finish(); // Close the activity
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(AddObjetActivity.this, "Failed to add object", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            File photoFile = null;
            try {
                photoFile = createImageFile();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            if (photoFile != null) {
                Uri photoURI = FileProvider.getUriForFile(this,
                        "com.example.tpt_mbds.fileprovider",
                        photoFile);
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
            }
        }
    }

    private void dispatchPickPictureIntent() {
        Intent pickPhoto = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(pickPhoto, REQUEST_IMAGE_PICK);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            File imgFile = new File(currentPhotoPath);
            if (imgFile.exists()) {
                Bitmap bitmap = BitmapFactory.decodeFile(imgFile.getAbsolutePath());
                String encodedImage = ObjetService.encodeImageToBase64(bitmap);
                imagesBase64.add(encodedImage);
                selectedImageView.setImageBitmap(bitmap);
                selectedImageView.setVisibility(View.VISIBLE);
                removeImageButton.setVisibility(View.VISIBLE);
            }
        } else if (requestCode == REQUEST_IMAGE_PICK && resultCode == RESULT_OK && data != null) {
            Uri selectedImageUri = data.getData();
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), selectedImageUri);
                String encodedImage = ObjetService.encodeImageToBase64(bitmap);
                imagesBase64.add(encodedImage);
                selectedImageView.setImageURI(selectedImageUri);
                selectedImageView.setVisibility(View.VISIBLE);
                removeImageButton.setVisibility(View.VISIBLE);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );

        // Save a file: path for use with ACTION_VIEW intents
        currentPhotoPath = image.getAbsolutePath();
        return image;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_CAMERA_PERMISSION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                dispatchTakePictureIntent();
            } else {
                Toast.makeText(this, "Camera permission is required to take pictures", Toast.LENGTH_SHORT).show();
            }
        }
    }
}
