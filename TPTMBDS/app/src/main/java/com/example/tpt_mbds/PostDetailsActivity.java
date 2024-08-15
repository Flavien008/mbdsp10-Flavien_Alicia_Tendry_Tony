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
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.adapteur.CommentAdapter;
import com.example.tpt_mbds.adapteur.ExchangeAdapter;
import com.example.tpt_mbds.model.Comment;
import com.example.tpt_mbds.model.Exchange;
import com.example.tpt_mbds.model.Post;
import com.example.tpt_mbds.service.CommentService;
import com.example.tpt_mbds.service.ExchangeService;
import com.example.tpt_mbds.service.PostService;
import com.example.tpt_mbds.service.TokenManager;

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
    private EditText commentInput;
    private Button addCommentButton;
    private PostService postService;
    private CommentService commentService;
    private ExchangeService exchangeService;

    private int postId;
    private int authorId;
    private RelativeLayout loadingLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_details);

        // Obtenir l'ID du post à partir de l'intent
        postId = getIntent().getIntExtra("POST_ID", -1);

        // Initialize views
        categoryTextView = findViewById(R.id.category_text_view);
        descriptionTextView = findViewById(R.id.description_text_view);
        postImage = findViewById(R.id.post_image);
        commentInput = findViewById(R.id.comment_input);
        addCommentButton = findViewById(R.id.add_comment_button);
        loadingLayout = findViewById(R.id.loading_layout); // Initialiser le layout de chargement

        postService = new PostService(this);
        commentService = new CommentService(this);
        exchangeService = new ExchangeService(this);

        // Commentaire
        commentRecyclerView = findViewById(R.id.comment_recycler_view);
        commentRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        commentList = new ArrayList<>();
        commentAdapter = new CommentAdapter(commentList);
        commentRecyclerView.setAdapter(commentAdapter);

        // Set up add comment button
        addCommentButton.setOnClickListener(v -> {
            String commentText = commentInput.getText().toString().trim();
            if (!commentText.isEmpty()) {
                addComment(commentText);
            } else {
                Toast.makeText(PostDetailsActivity.this, "Commentaire vide", Toast.LENGTH_SHORT).show();
            }
        });

        // Exchange
        exchangeRecyclerView = findViewById(R.id.exchange_recycler_view);
        exchangeRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        exchangeList = new ArrayList<>();
        exchangeAdapter = new ExchangeAdapter(exchangeList, this);
        exchangeRecyclerView.setAdapter(exchangeAdapter);

        // WebView Configuration
        mapWebView = findViewById(R.id.map_webview);
        WebSettings webSettings = mapWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        mapWebView.setWebViewClient(new WebViewClient());
        mapWebView.loadUrl("file:///android_res/raw/leaflet_map.html");

        ImageView backArrow = findViewById(R.id.back_arrow);
        backArrow.setOnClickListener(v -> finish());

        // Button Proposer échange
        proposerEchangeButton = findViewById(R.id.proposer_echange_button);

        echangeLayout = findViewById(R.id.echange_layout);

        if (postId != -1) {
            fetchPostDetails(postId);
        } else {
            finish();
        }
    }

    private void fetchPostDetails(int postId) {
        loadingLayout.setVisibility(View.VISIBLE); // Show loading layout

        postService.fetchPostById(postId, new PostService.FetchPostCallback() {
            @Override
            public void onSuccess(Post post) {
                categoryTextView.setText(post.getCategory());
                descriptionTextView.setText(post.getDescription());
                authorId = Integer.parseInt(post.getAuthor());

                // Check if it's the user's own post after fetching details
                boolean isOwnPost = checkIfOwnPost();
                if (isOwnPost) {
                    proposerEchangeButton.setVisibility(View.GONE);
                    echangeLayout.setVisibility(View.VISIBLE);
                    fetchExchanges(); // Fetch exchanges if it's the user's post
                } else {
                    proposerEchangeButton.setVisibility(View.VISIBLE);
                    echangeLayout.setVisibility(View.GONE);
                }

                String base64Image = post.getImageBase64();
                if (base64Image != null && !base64Image.isEmpty()) {
                    byte[] decodedString = Base64.decode(base64Image.split(",")[1], Base64.DEFAULT);
                    Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
                    postImage.setImageBitmap(decodedByte);
                }

                loadingLayout.setVisibility(View.GONE); // Hide loading layout after execution
            }

            @Override
            public void onError(String message) {
                loadingLayout.setVisibility(View.GONE); // Hide loading layout in case of error
                Toast.makeText(PostDetailsActivity.this, "Erreur de chargement du post", Toast.LENGTH_SHORT).show();
            }
        });

        // Fetch comments
        fetchComments();
    }

    private void fetchExchanges() {
        exchangeService.fetchExchanges(new ExchangeService.FetchExchangesCallback() {
            @Override
            public void onSuccess(List<Exchange> exchanges) {
                exchangeList.clear();
                exchangeList.addAll(exchanges);
                exchangeAdapter.notifyDataSetChanged();
            }

            @Override
            public void onError(String message) {
                Toast.makeText(PostDetailsActivity.this, "Erreur lors de la récupération des échanges", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void fetchComments() {
        commentService.fetchCommentsByPostId(postId, new CommentService.FetchCommentsCallback() {
            @Override
            public void onSuccess(List<Comment> comments) {
                commentList.clear();
                commentList.addAll(comments);
                commentAdapter.notifyDataSetChanged();
            }

            @Override
            public void onError(String message) {
                Toast.makeText(PostDetailsActivity.this, "Erreur lors de la récupération des commentaires", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void addComment(String commentText) {
        int userId = TokenManager.getInstance(this).getUserId();
        String userName = TokenManager.getInstance(this).getUsername();
        String useridstring = "" + userId;

        commentService.addComment(commentText, useridstring, postId, userName, new CommentService.AddCommentCallback() {
            @Override
            public void onSuccess(Comment comment) {
                commentList.add(0, comment); // Add new comment at the top
                commentAdapter.notifyItemInserted(0);
                commentInput.setText(""); // Clear input field
            }

            @Override
            public void onError(String message) {
                Toast.makeText(PostDetailsActivity.this, "Erreur lors de l'ajout du commentaire", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private boolean checkIfOwnPost() {
        int currentUserId = TokenManager.getInstance(this).getUserId();
        System.out.println("currentUserId: " + currentUserId);
        System.out.println("authorId: " + authorId);

        return currentUserId == authorId; // Compare the current user's ID with the author ID
    }
}
