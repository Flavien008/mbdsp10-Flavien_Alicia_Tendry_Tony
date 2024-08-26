package com.example.tpt_mbds.service;

import android.content.Context;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tpt_mbds.service.TokenManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class UserService {

    private static final String SIGNUP_URL = ApiConfig.BASE_URL + "/users/signup";
    private static final String LOGIN_URL = ApiConfig.BASE_URL + "/users/login";
    private static final String USER_INFO_URL = ApiConfig.BASE_URL + "/users/user/";
    private static final String USER_UPDATE_URL = ApiConfig.BASE_URL + "/users/";


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
                callback::onSuccess,
                callback::onError);

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
                response -> {
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
                },
                callback::onError);

        requestQueue.add(request);
    }

    public void getUserInfo(int userId, final UserInfoCallback callback) {
        String url = USER_INFO_URL + userId;

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                callback::onSuccess,
                callback::onError) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                headers.put("Authorization", "Bearer " + tokenManager.getToken());
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public void updateUser(int userId, String username, String email, String birthdate, String password, final UserUpdateCallback callback) {
        String url = USER_UPDATE_URL + userId;
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("username", username);
            requestBody.put("email", email);
            requestBody.put("dateNaissance", birthdate);
            if (password != null) {
                requestBody.put("password", password);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.PUT, url, requestBody,
                callback::onSuccess,
                callback::onError) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                headers.put("Authorization", "Bearer " + tokenManager.getToken());
                return headers;
            }
        };

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

    public interface UserInfoCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }

    public interface UserUpdateCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }
}
