package com.example.tpt_mbds.service;

import android.content.Context;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
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

    private static final String COMMENT_URL = ApiConfig.BASE_URL + "/commentaires/poste/";
    private RequestQueue requestQueue;
    private TokenManager tokenManager;

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
}
