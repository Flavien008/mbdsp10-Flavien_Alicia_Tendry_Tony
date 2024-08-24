package com.example.tpt_mbds.service;

import android.content.Context;
import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;

import java.util.HashMap;
import java.util.Map;

public class NotificationService {

    private static final String BASE_URL = ApiConfig.BASE_URL + "/notifications/user/";
    private RequestQueue requestQueue;
    private TokenManager tokenManager;

    public NotificationService(Context context) {
        requestQueue = Volley.newRequestQueue(context);
        tokenManager = TokenManager.getInstance(context);
    }

    public void getNotificationsByUser(int userId, final FetchNotificationsCallback callback) {
        String url = BASE_URL + userId;

        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        callback.onSuccess(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError(error);
                    }
                }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                headers.put("Authorization", "Bearer " + tokenManager.getToken());
                headers.put("Content-Type", "application/json");
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public interface FetchNotificationsCallback {
        void onSuccess(JSONArray response);
        void onError(VolleyError error);
    }
}
