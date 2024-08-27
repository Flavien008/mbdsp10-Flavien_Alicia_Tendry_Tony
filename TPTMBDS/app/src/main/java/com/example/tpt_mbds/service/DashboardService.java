package com.example.tpt_mbds.service;

import android.content.Context;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.tpt_mbds.model.ExchangeStats;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DashboardService {

    private static final String DASHBOARD_URL = ApiConfig.BASE_URL + "/dashboard/exchangestatsbyUser";
    private RequestQueue requestQueue;
    private TokenManager tokenManager;

    public DashboardService(Context context) {
        this.requestQueue = Volley.newRequestQueue(context);
        this.tokenManager = TokenManager.getInstance(context);
    }

    public void fetchExchangeStatsByUser(int userId, int year, final FetchExchangeStatsCallback callback) {
        String url = DASHBOARD_URL + "?userId=" + userId + "&year=" + year;

        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        List<ExchangeStats> statsList = new ArrayList<>();
                        try {
                            for (int i = 0; i < response.length(); i++) {
                                JSONObject statsObject = response.getJSONObject(i);
                                ExchangeStats stats = new ExchangeStats(
                                        statsObject.getString("month"),
                                        statsObject.getInt("total"),
                                        statsObject.getInt("accepted")
                                );
                                statsList.add(stats);
                            }
                            callback.onSuccess(statsList);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            callback.onError("Erreur lors du traitement des données");
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onError("Erreur lors de la récupération des statistiques");
                    }
                }) {
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

    public interface FetchExchangeStatsCallback {
        void onSuccess(List<ExchangeStats> exchangeStats);
        void onError(String message);
    }
}
