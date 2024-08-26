package com.example.tpt_mbds.service;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Base64;

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

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ObjetService {

    private static final String OBJET_URL = ApiConfig.BASE_URL + "/objets";

    private RequestQueue requestQueue;
    private Context context;

    public ObjetService(Context context) {
        this.context = context;
        requestQueue = Volley.newRequestQueue(context);
    }

    public void addObject(int userId, int categorieId, String name, String description, List<String> imagesBase64, final AddObjectCallback callback) {
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("user_id", userId);
            requestBody.put("categorie_id", categorieId);
            requestBody.put("name", name);
            requestBody.put("description", description);

            JSONArray imagesArray = new JSONArray();
            for (String imageBase64 : imagesBase64) {
                imagesArray.put(imageBase64);
            }
            requestBody.put("images", imagesArray);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, OBJET_URL, requestBody,
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
                headers.put("Authorization", "Bearer " + TokenManager.getInstance(context).getToken());
                return headers;
            }
        };

        requestQueue.add(request);
    }

    public void fetchObjets(int page, int limit, final FetchObjetsCallback callback) {
        String url = OBJET_URL + "?page=" + page + "&limit=" + limit;

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

    public interface FetchObjetsCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }

    public interface AddObjectCallback {
        void onSuccess(JSONObject response);
        void onError(VolleyError error);
    }

    public static String encodeImageToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return "data:image/png;base64," + Base64.encodeToString(byteArray, Base64.DEFAULT);
    }
}
