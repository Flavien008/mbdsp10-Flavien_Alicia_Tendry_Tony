package com.example.tpt_mbds;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.adapteur.CommentAdapter;
import com.example.tpt_mbds.adapteur.ExchangeAdapter;
import com.example.tpt_mbds.model.Comment;
import com.example.tpt_mbds.model.Exchange;

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

    private Button proposerEchangeButton;
    private LinearLayout echangeLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_details);

        //Commentaire
        commentRecyclerView = findViewById(R.id.comment_recycler_view);
        commentRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        commentList = new ArrayList<>();
        populateCommentList();

        commentAdapter = new CommentAdapter(commentList);
        commentRecyclerView.setAdapter(commentAdapter);

        //Exchange
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
        proposerEchangeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(PostDetailsActivity.this, ProposeExchangeActivity.class);
                startActivity(intent);
            }
        });

        // Section Echange (à remplacer avec votre layout actuel pour les échanges)
        echangeLayout = findViewById(R.id.echange_layout); // Assurez-vous que cette ID existe dans votre layout XML

        // Vérifiez si l'utilisateur visualise son propre post ou non
        boolean isOwnPost = checkIfOwnPost();

        if (!isOwnPost) {
            proposerEchangeButton.setVisibility(View.VISIBLE);
            echangeLayout.setVisibility(View.GONE); // Masquer la liste des échanges
        }

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
        // Cela pourrait être basé sur l'ID de l'utilisateur et l'ID du créateur du post
        // Par exemple :
        // return post.getAuthorId().equals(currentUserId);
        return false; // Exemple par défaut, à remplacer par la logique réelle(false ty ntena izy)
    }
}
