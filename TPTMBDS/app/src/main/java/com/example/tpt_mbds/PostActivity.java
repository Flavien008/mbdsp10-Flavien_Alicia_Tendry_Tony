package com.example.tpt_mbds;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.adapteur.PostAdapter;
import com.example.tpt_mbds.model.Post;

import java.util.ArrayList;
import java.util.List;

public class PostActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private PostAdapter adapter;
    private List<Post> postList;
    private Button allPostsButton;
    private Button myPostsButton;
    private View activeTabIndicator;

    private ImageView searchIcon;

    private ImageView addIcon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new GridLayoutManager(this, 2));

        allPostsButton = findViewById(R.id.all_posts_button);
        myPostsButton = findViewById(R.id.my_posts_button);
        activeTabIndicator = findViewById(R.id.active_tab_indicator);

        searchIcon = findViewById(R.id.search_icon);
        searchIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(PostActivity.this, SearchActivity.class);
                startActivity(intent);
            }
        });

        addIcon = findViewById(R.id.add_icon);
        addIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(PostActivity.this, AddPostActivity.class);
                startActivity(intent);
            }
        });

        // Initialiser la liste des posts (vous pouvez charger les données dynamiquement)
        postList = new ArrayList<>();
        populatePostList();

        // Initialiser l'adaptateur
        adapter = new PostAdapter(postList, this);
        recyclerView.setAdapter(adapter);

        allPostsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Afficher tous les posts
                populatePostList();  // Recharge la liste avec tous les posts
                adapter.notifyDataSetChanged();
                updateTabIndicator(allPostsButton);
            }
        });

        myPostsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Afficher mes posts
                populateMyPosts();  // Recharge la liste avec mes posts
                adapter.notifyDataSetChanged();
                updateTabIndicator(myPostsButton);
            }
        });

        // Mettre à jour l'indicateur d'onglet initial
        updateTabIndicator(allPostsButton);
    }

    private void populatePostList() {
        postList.clear();
        postList.add(new Post("Nom du poste", "NomTitulaire", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sagittis turpis et sodales.", "Lieu"));
        postList.add(new Post("Nom du poste", "NomTitulaire", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sagittis turpis et sodales.", "Lieu"));
        postList.add(new Post("Nom du poste", "NomTitulaire", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sagittis turpis et sodales.", "Lieu"));
        postList.add(new Post("Nom du poste", "NomTitulaire", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque sagittis turpis et sodales.", "Lieu"));
    }

    private void populateMyPosts() {
        postList.clear();
        postList.add(new Post("Mon poste", "Moi", "Catégorie personnelle", "Ceci est une description de mon poste.", "Mon Lieu"));
        // Ajoutez d'autres posts personnels si nécessaire
    }

    private void updateTabIndicator(Button activeButton) {
        // Déplacer l'indicateur d'onglet sous le bouton actif
        activeTabIndicator.setX(activeButton.getX());
        activeTabIndicator.setLayoutParams(new RelativeLayout.LayoutParams(activeButton.getWidth(), 2));
    }
}
