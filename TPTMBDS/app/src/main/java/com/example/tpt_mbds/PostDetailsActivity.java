package com.example.tpt_mbds;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.adapteur.CommentAdapter;
import com.example.tpt_mbds.adapteur.ExchangeAdapter;
import com.example.tpt_mbds.model.Comment;
import com.example.tpt_mbds.model.Exchange;
import com.example.tpt_mbds.model.Post;
import com.example.tpt_mbds.service.PostService;

import java.util.ArrayList;
import java.util.List;

public class PostDetailsActivity extends AppCompatActivity {

    private RecyclerView commentRecyclerView;
    private CommentAdapter commentAdapter;
    private List<Comment> commentList;

    private RecyclerView exchangeRecyclerView;
    private ExchangeAdapter exchangeAdapter;
    private List<Exchange> exchangeList;

    private WebView mapWebView;
    private TextView categoryTextView, descriptionTextView;
    private ImageView postImage;

    private Button proposerEchangeButton;
    private LinearLayout echangeLayout;

    private View loadingLayout;
    private View contentLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_details);

        // Initialiser les vues de chargement et de contenu
        loadingLayout = findViewById(R.id.loading_layout);
        contentLayout = findViewById(R.id.content_layout);

        // Cacher le contenu au début
        contentLayout.setVisibility(View.GONE);
        loadingLayout.setVisibility(View.VISIBLE);

        // Obtenir l'ID du post à partir de l'intent
        int postId = getIntent().getIntExtra("POST_ID", -1);

        // Initialiser les vues
        categoryTextView = findViewById(R.id.category_text_view);
        descriptionTextView = findViewById(R.id.description_text_view);
        postImage = findViewById(R.id.post_image);

        // Commentaire
        commentRecyclerView = findViewById(R.id.comment_recycler_view);
        commentRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        commentList = new ArrayList<>();
        populateCommentList();

        commentAdapter = new CommentAdapter(commentList);
        commentRecyclerView.setAdapter(commentAdapter);

        // Exchange
        exchangeRecyclerView = findViewById(R.id.exchange_recycler_view);
        exchangeRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        exchangeList = new ArrayList<>();
        populateExchangeList();

        exchangeAdapter = new ExchangeAdapter(exchangeList, this);
        exchangeRecyclerView.setAdapter(exchangeAdapter);

        // Configuration de la WebView
        mapWebView = findViewById(R.id.map_webview);
        WebSettings webSettings = mapWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        mapWebView.setWebViewClient(new WebViewClient());
        mapWebView.loadUrl("file:///android_res/raw/leaflet_map.html");

        ImageView backArrow = findViewById(R.id.back_arrow);
        backArrow.setOnClickListener(v -> finish());

        // Bouton Proposer échange
        proposerEchangeButton = findViewById(R.id.proposer_echange_button);
        proposerEchangeButton.setOnClickListener(v -> {
            // Logique pour proposer un échange
        });

        // Section Echange (à remplacer avec votre layout actuel pour les échanges)
        echangeLayout = findViewById(R.id.echange_layout);

        // Vérifiez si l'utilisateur visualise son propre post ou non
        boolean isOwnPost = checkIfOwnPost();

        if (!isOwnPost) {
            proposerEchangeButton.setVisibility(View.VISIBLE);
            echangeLayout.setVisibility(View.GONE); // Masquer la liste des échanges
        }

        if (postId != -1) {
            fetchPostDetails(postId);
        } else {
            // Gérer le cas où l'ID est manquant
            finish();
        }
    }

    private void fetchPostDetails(int postId) {
        // Utiliser votre service pour récupérer les détails du post
        PostService postService = new PostService(this);
        postService.fetchPostById(postId, new PostService.FetchPostCallback() {
            @Override
            public void onSuccess(Post post) {
                // Cacher le layout de chargement et afficher le contenu
                loadingLayout.setVisibility(View.GONE);
                contentLayout.setVisibility(View.VISIBLE);

                // Remplir les vues avec les données du post
                categoryTextView.setText(post.getCategory());
                descriptionTextView.setText(post.getDescription());

                // Décodez l'image Base64 et affichez-la
                String base64Image = post.getImageBase64();
                if (base64Image != null && !base64Image.isEmpty()) {
                    byte[] decodedString = Base64.decode(base64Image.split(",")[1], Base64.DEFAULT);
                    Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
                    postImage.setImageBitmap(decodedByte);
                }
            }

            @Override
            public void onError(String message) {
                loadingLayout.setVisibility(View.GONE);
                Toast.makeText(PostDetailsActivity.this, "Erreur: " + message, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void populateCommentList() {
        commentList.add(new Comment("Tommy Anderson", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sagittis turpis ut sodales."));
        commentList.add(new Comment("Jean Philips", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sagittis turpis ut sodales."));
        commentList.add(new Comment("Ronald Simon", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sagittis turpis ut sodales."));
        commentList.add(new Comment("Luc Hervé", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sagittis turpis ut sodales."));
        // Ajoutez plus de commentaires si nécessaire
    }

    private void populateExchangeList() {
        exchangeList.add(new Exchange("Jean Philips", "Produit2", "Validé"));
        exchangeList.add(new Exchange("Tommy Anderson", "Produit5", "Valider"));
        exchangeList.add(new Exchange("Marc Rolland", "Produit3", "Valider"));
        exchangeList.add(new Exchange("Ronald Simon", "Produit2", "Valider"));
        exchangeList.add(new Exchange("Luc Hervé", "Produit9", "Valider"));
        // Ajoutez plus d'échanges si nécessaire
    }

    private boolean checkIfOwnPost() {
        // Logique pour vérifier si l'utilisateur visualise son propre post
        return false; // Exemple par défaut, à remplacer par la logique réelle
    }
}
