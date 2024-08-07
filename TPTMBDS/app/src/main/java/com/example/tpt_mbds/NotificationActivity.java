package com.example.tpt_mbds;

import android.app.Notification;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.adapteur.NotificationAdapter;
import com.example.tpt_mbds.model.Notif;

import java.util.ArrayList;
import java.util.List;

public class NotificationActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private NotificationAdapter adapter;
    private List<Notif> notificationList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notification);

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Initialiser la liste de notifications
        notificationList = new ArrayList<>();
        notificationList.add(new Notif("Commentaire", "Jean Luc a ajouté un commentaire"));
        notificationList.add(new Notif("Commentaire", "Jean Luc a ajouté un commentaire"));
        notificationList.add(new Notif("Commentaire", "Jean Luc a ajouté un commentaire"));
        notificationList.add(new Notif("Commentaire", "Jean Luc a ajouté un commentaire"));
        notificationList.add(new Notif("Commentaire", "Jean Luc a ajouté un commentaire"));

        // Initialiser l'adaptateur
        adapter = new NotificationAdapter(notificationList);
        recyclerView.setAdapter(adapter);
    }
}