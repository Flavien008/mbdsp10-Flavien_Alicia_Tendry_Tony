package com.example.tpt_mbds.service;

import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class UserService {

    private static final String SIGNUP_URL = "https://api.example.com/signup"; // Replace with your API URL
    private RequestQueue requestQueue;

    public UserService(Context context) {
        requestQueue = Volley.newRequestQueue(context);
    }

    public void signup(String username, String email, String dateNaissance, int roleId, String password, final SignupCallback callback) {
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("username", username);
            requestBody.put("email", email);
            requestBody.put("dateNaissance", dateNaissance);
            requestBody.put("role_id", roleId);
            requestBody.put("password", password);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, SIGNUP_URL, requestBody,
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
                });

        requestQueue.add(request);
    }

    public interface SignupCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }
}
