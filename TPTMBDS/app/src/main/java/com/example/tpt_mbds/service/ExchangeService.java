package com.example.tpt_mbds.service;

import android.content.Context;
import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.tpt_mbds.model.Exchange;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExchangeService {

    private static final String EXCHANGE_URL = ApiConfig.BASE_URL + "/echanges";
    private RequestQueue requestQueue;
    private TokenManager tokenManager;

    public ExchangeService(Context context) {
        this.requestQueue = Volley.newRequestQueue(context);
        this.tokenManager = TokenManager.getInstance(context);
    }

    public void fetchExchanges(final FetchExchangesCallback callback) {
        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, EXCHANGE_URL, null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        List<Exchange> exchangeList = new ArrayList<>();
                        try {
                            for (int i = 0; i < response.length(); i++) {
                                JSONObject exchangeObject = response.getJSONObject(i);
                                Exchange exchange = parseExchange(exchangeObject);
                                exchangeList.add(exchange);
                            }
                            callback.onSuccess(exchangeList);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            callback.onError("Erreur lors du traitement des données");
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError("Erreur lors de la récupération des échanges");
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



    public void createExchange(JSONObject requestBody, final CreateExchangeCallback callback) {
        // Afficher le corps de la requête dans les logs
        Log.d("ExchangeService", "Request Body: " + requestBody.toString());

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, EXCHANGE_URL, requestBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        callback.onSuccess(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError("Erreur lors de la création de l'échange");
                    }
                }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json");
                headers.put("Authorization", "Bearer " + tokenManager.getToken());
                return headers;
            }
        };

        requestQueue.add(request);
    }



    private Exchange parseExchange(JSONObject exchangeObject) throws JSONException {
        int id = exchangeObject.getInt("id");
        String proposerUsername = exchangeObject.getJSONObject("Proposer").getString("username");
        String responderUsername = exchangeObject.getJSONObject("Responder").getString("username");
        String postTitle = exchangeObject.getJSONObject("Poste").getString("titre");
        String status = exchangeObject.getString("status");

        JSONArray detailsArray = exchangeObject.getJSONArray("EchangeDetails");
        List<String> objectNames = new ArrayList<>();
        for (int j = 0; j < detailsArray.length(); j++) {
            JSONObject detailObject = detailsArray.getJSONObject(j);
            String objectName = detailObject.getJSONObject("Objet").getString("name");
            objectNames.add(objectName);
        }

        return new Exchange(id, proposerUsername, responderUsername, postTitle, status, objectNames);
    }

    public interface FetchExchangesCallback {
        void onSuccess(List<Exchange> exchanges);
        void onError(String message);
    }

    public interface CreateExchangeCallback {
        void onSuccess(JSONObject response);
        void onError(String message);
    }
}
