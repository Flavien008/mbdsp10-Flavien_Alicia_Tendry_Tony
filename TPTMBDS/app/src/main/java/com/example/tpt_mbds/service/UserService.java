package com.example.tpt_mbds.service;

import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class UserService {

    private static final String SIGNUP_URL = ApiConfig.BASE_URL + "/users/signup";
    private static final String LOGIN_URL = ApiConfig.BASE_URL + "/users/login";

    private RequestQueue requestQueue;
    private TokenManager tokenManager;

    public UserService(Context context) {
        requestQueue = Volley.newRequestQueue(context);
        tokenManager = TokenManager.getInstance(context);
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
                new com.android.volley.Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        callback.onSuccess(response);
                    }
                },
                new com.android.volley.Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError(error);
                    }
                });

        requestQueue.add(request);
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
                new com.android.volley.Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject userObject = response.getJSONObject("user");
                            String token = response.getString("token");

                            // Save user info and token using TokenManager
                            tokenManager.saveToken(token);
                            tokenManager.saveUserId(userObject.getInt("id"));
                            tokenManager.saveUsername(userObject.getString("name"));

                            callback.onSuccess(response);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new com.android.volley.Response.ErrorListener() {
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

    public interface LoginCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }
}
