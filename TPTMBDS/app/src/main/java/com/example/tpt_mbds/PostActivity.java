package com.example.tpt_mbds;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.example.tpt_mbds.adapteur.PostsPagerAdapter;
import com.google.android.material.tabs.TabLayout;

public class PostActivity extends AppCompatActivity {

    private ViewPager viewPager;
    private TabLayout tabLayout;
    private ImageView searchIcon, addIcon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);

        tabLayout = findViewById(R.id.tabLayout);
        viewPager = findViewById(R.id.viewPager);
        searchIcon = findViewById(R.id.search_icon);
        addIcon = findViewById(R.id.add_icon);

        // Configurer l'adaptateur pour le ViewPager
        PostsPagerAdapter adapter = new PostsPagerAdapter(getSupportFragmentManager(), PostsPagerAdapter.BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        viewPager.setAdapter(adapter);
        tabLayout.setupWithViewPager(viewPager);

        searchIcon.setOnClickListener(v -> {
            Intent intent = new Intent(PostActivity.this, SearchActivity.class);
            startActivity(intent);
        });

        addIcon.setOnClickListener(v -> {
            Intent intent = new Intent(PostActivity.this, AddPostActivity.class);
            startActivity(intent);
        });
    }
}
