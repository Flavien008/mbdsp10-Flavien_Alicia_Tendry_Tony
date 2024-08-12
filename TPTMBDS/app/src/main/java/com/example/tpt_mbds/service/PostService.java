package com.example.tpt_mbds.service;

import android.content.Context;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostService {

    private static final String POST_URL = ApiConfig.BASE_URL + "/postes";
    private RequestQueue requestQueue;
    private TokenManager tokenManager;

    public PostService(Context context) {
        this.requestQueue = Volley.newRequestQueue(context);
        this.tokenManager = TokenManager.getInstance(context);
    }

    public void addPost(int userId, String title, double longitude, double latitude, String description, boolean status, List<Integer> items, final AddPostCallback callback) {
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("user_id", userId);
            requestBody.put("titre", title);
            requestBody.put("longitude", longitude);
            requestBody.put("latitude", latitude);
            requestBody.put("description", description);
            requestBody.put("status", status);

            JSONArray itemsArray = new JSONArray();
            for (int item : items) {
                itemsArray.put(item);
            }
            requestBody.put("items", itemsArray);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, POST_URL, requestBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
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
                headers.put("Content-Type", "application/json");
                String token = tokenManager.getToken();
                if (token != null) {
                    headers.put("Authorization", "Bearer " + token);
                }
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public interface AddPostCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }
}
