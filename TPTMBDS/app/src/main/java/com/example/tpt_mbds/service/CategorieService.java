package com.example.tpt_mbds.service;

import android.content.Context;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;


import org.json.JSONArray;

import java.util.HashMap;
import java.util.Map;

public class CategorieService {

    private static final String CATEGORIES_URL = ApiConfig.BASE_URL + "/categories";
    private RequestQueue requestQueue;
    private TokenManager tokenManager;

    public CategorieService(Context context) {
        requestQueue = Volley.newRequestQueue(context);
        tokenManager = TokenManager.getInstance(context);  // Obtain the singleton instance of TokenManager
    }

    public void getCategories(final CategoriesCallback callback) {
        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, CATEGORIES_URL, null,
                new com.android.volley.Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        callback.onSuccess(response);
                    }
                },
                new com.android.volley.Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError(error);
                    }
                }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                String token = tokenManager.getToken();
                if (token != null) {
                    headers.put("Authorization", "Bearer " + token);
                }
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public interface CategoriesCallback {
        void onSuccess(JSONArray response);
        void onError(VolleyError error);
    }
}
