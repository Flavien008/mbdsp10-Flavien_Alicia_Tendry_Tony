package com.example.tpt_mbds.service;

import android.content.Context;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tpt_mbds.model.Comment;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommentService {

    private static final String ADDCOMMENT_URL = ApiConfig.BASE_URL + "/commentaires/";
    private static final String COMMENT_URL = ApiConfig.BASE_URL + "/commentaires/poste/";
    private RequestQueue requestQueue;
    private TokenManager tokenManager;
    private Context context;

    public CommentService(Context context) {
        this.requestQueue = Volley.newRequestQueue(context);
        this.tokenManager = TokenManager.getInstance(context);
    }

    public void fetchCommentsByPostId(int postId, final FetchCommentsCallback callback) {
        String url = COMMENT_URL + postId;

        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            List<Comment> comments = new ArrayList<>();
                            for (int i = 0; i < response.length(); i++) {
                                JSONObject commentData = response.getJSONObject(i);

                                String id = commentData.getString("_id");
                                String description = commentData.getString("description");
                                String author = commentData.getJSONObject("utilisateur").getString("username");
                                String createdAt = commentData.getString("created_at");

                                Comment comment = new Comment(id, author, description, createdAt);
                                comments.add(comment);
                            }
                            callback.onSuccess(comments);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            callback.onError("Erreur lors du traitement des données");
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError("Erreur lors de la récupération des commentaires");
                    }
                }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                headers.put("Authorization", "Bearer " + tokenManager.getToken());
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public interface FetchCommentsCallback {
        void onSuccess(List<Comment> comments);
        void onError(String message);
    }

    public void addComment(String description, String auteurId, int postId,String user, final AddCommentCallback callback) {
        String url = ADDCOMMENT_URL;

        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("description", description);
            requestBody.put("auteur_id", auteurId);
            requestBody.put("poste_id", postId);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, requestBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
//                            String id = response.getString("_id");
                            String description = response.getJSONObject("commentaire").getString("description");
                            String username = user;

                            Comment comment = new Comment(username,description);

                            callback.onSuccess(comment);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            callback.onError("Erreur lors de la création du commentaire");
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError("Erreur lors de la création du commentaire");
                    }
                }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                headers.put("Authorization", "Bearer " + TokenManager.getInstance(context).getToken());
                headers.put("Content-Type", "application/json");
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public interface AddCommentCallback {
        void onSuccess(Comment comment);
        void onError(String message);
    }
}
