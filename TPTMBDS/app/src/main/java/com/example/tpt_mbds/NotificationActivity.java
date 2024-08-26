package com.example.tpt_mbds;

import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.adapteur.NotificationAdapter;
import com.example.tpt_mbds.model.Notif;
import com.example.tpt_mbds.service.NotificationService;
import com.example.tpt_mbds.service.TokenManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class NotificationActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private NotificationAdapter adapter;
    private List<Notif> notificationList;
    private NotificationService notificationService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notification);

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        notificationList = new ArrayList<>();
        adapter = new NotificationAdapter(notificationList);
        recyclerView.setAdapter(adapter);

        notificationService = new NotificationService(this);
        fetchNotifications();
    }

    private void fetchNotifications() {
        int userId = TokenManager.getInstance(this).getUserId(); // Récupérer l'ID de l'utilisateur actuel
        notificationService.getNotificationsByUser(userId, new NotificationService.FetchNotificationsCallback() {
            @Override
            public void onSuccess(JSONArray response) {
                try {
                    for (int i = 0; i < response.length(); i++) {
                        JSONObject notificationObject = response.getJSONObject(i);
                        String id = notificationObject.getString("_id");
                        String message = notificationObject.getString("message");
                        String createdAt = notificationObject.getString("created_at");
                        boolean isRead = notificationObject.getBoolean("read");

                        Notif notification = new Notif(id, message, createdAt, isRead);
                        notificationList.add(notification);
                    }
                    adapter.notifyDataSetChanged();
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(NotificationActivity.this, "Erreur lors du traitement des données", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onError(VolleyError error) {
                Toast.makeText(NotificationActivity.this, "Erreur lors de la récupération des notifications", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
