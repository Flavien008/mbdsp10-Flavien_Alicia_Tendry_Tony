package com.example.tpt_mbds.service;

import android.content.Context;
import android.content.SharedPreferences;
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

    private static final String SIGNUP_URL = ApiConfig.BASE_URL + "/users/signup";
    private static final String LOGIN_URL = ApiConfig.BASE_URL + "/users/login";

    private RequestQueue requestQueue;
    private SharedPreferences sharedPreferences;

    public UserService(Context context) {
        requestQueue = Volley.newRequestQueue(context);
        sharedPreferences = context.getSharedPreferences("UserPrefs", Context.MODE_PRIVATE);
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

    public void login(String username, String password, final LoginCallback callback) {
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("username", username);
            requestBody.put("password", password);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, LOGIN_URL, requestBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject userObject = response.getJSONObject("user");
                            String token = response.getString("token");

                            // Save user info and token to SharedPreferences
                            SharedPreferences.Editor editor = sharedPreferences.edit();
                            editor.putInt("userId", userObject.getInt("id"));
                            editor.putString("username", userObject.getString("name"));
                            editor.putString("token", token);
                            editor.apply();

                            callback.onSuccess(response);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
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

    public interface LoginCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }
}
