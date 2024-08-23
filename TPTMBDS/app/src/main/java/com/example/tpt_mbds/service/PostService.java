package com.example.tpt_mbds.service;

import android.content.Context;
import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tpt_mbds.model.Post;

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
    private Context context;
    private static final String TAG = "PostService";

    public PostService(Context context) {
        this.requestQueue = Volley.newRequestQueue(context);
        this.tokenManager = TokenManager.getInstance(context);
        this.context = context;
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

        // Log the URL and the request body
        Log.d(TAG, "API URL: " + POST_URL);
        Log.d(TAG, "Request Body: " + requestBody.toString());

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

    public void fetchPosts(int page, int limit, final FetchPostsCallback callback) {
        String url = POST_URL + "?page=" + page + "&limit=" + limit;

        // Log the URL
        Log.d(TAG, "API URL: " + url);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
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
                headers.put("Authorization", "Bearer " + TokenManager.getInstance(context).getToken());
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public void fetchUserPosts(int userId, int page, int limit, final FetchPostsCallback callback) {
        String url = POST_URL + "/user/" + userId + "?userId="+userId+ "&page=" + page + "&limit=" + limit;

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                response -> callback.onSuccess(response),
                error -> callback.onError(error)) {
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

    public interface FetchPostsCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }

    public void fetchPostById(int postId, final FetchPostCallback callback) {
        String url = POST_URL + "/" + postId;

        // Log the URL
        Log.d(TAG, "API URL: " + url);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            int id = response.getInt("poste_id");
                            String title = response.getString("titre");
                            String description = response.getString("description");
                            String longitude = response.getString("longitude");
                            String latitude = response.getString("latitude");
                            String location = longitude + ", " + latitude;
//                            String author = response.getJSONObject("Utilisateur").getString("username");
                            String author = response.getString("user_id");

                            // Récupérer les détails du poste
                            JSONArray postDetailsArray = response.getJSONArray("Postedetails");
                            String category = "";
                            String imageBase64 = null;

                            if (postDetailsArray.length() > 0) {
                                JSONObject lastPostDetail = postDetailsArray.getJSONObject(postDetailsArray.length() - 1);
                                JSONObject objet = lastPostDetail.getJSONObject("Objet");
                                category = objet.getJSONObject("Categorie").getString("nom");

                                JSONArray imagesArray = objet.getJSONArray("images");
                                if (imagesArray.length() > 0) {
                                    imageBase64 = imagesArray.getJSONObject(imagesArray.length() - 1).getString("img");
                                }
                            }

                            // Créer un objet Post
                            Post post = new Post(id, title, author, category, description, location, imageBase64);

                            // Passer le post à l'interface de rappel (callback)
                            callback.onSuccess(post);

                        } catch (JSONException e) {
                            e.printStackTrace();
                            callback.onError("Erreur lors du traitement des données");
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError("Erreur lors de la récupération du poste");
                    }
                }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                headers.put("Authorization", "Bearer " + TokenManager.getInstance(context).getToken());
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public interface FetchPostCallback {
        void onSuccess(Post post);
        void onError(String message);
    }
}
