package com.example.tpt_mbds;

import android.graphics.Color;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.model.ExchangeStats;
import com.example.tpt_mbds.service.DashboardService;
import com.example.tpt_mbds.service.TokenManager;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.utils.ColorTemplate;

import java.util.ArrayList;
import java.util.List;

public class TotalParMoisFragment extends Fragment {

    private PieChart donutChart;

    public static TotalParMoisFragment newInstance() {
        return new TotalParMoisFragment();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_total_par_mois, container, false);
        donutChart = view.findViewById(R.id.donutChart);

        int userId = TokenManager.getInstance(getContext()).getUserId();
        loadTotalExchanges(userId);
        return view;
    }

    private void loadTotalExchanges(int userId) {
        DashboardService dashboardService = new DashboardService(getContext());
        dashboardService.fetchExchangeStatsByUser(userId, 2024, new DashboardService.FetchExchangeStatsCallback() {
            @Override
            public void onSuccess(List<ExchangeStats> exchangeStats) {
                displayTotalChart(exchangeStats);
            }

            @Override
            public void onError(String message) {
                // Handle error
            }
        });
    }

    private void displayTotalChart(List<ExchangeStats> data) {
        List<PieEntry> entries = new ArrayList<>();
        for (ExchangeStats stats : data) {
            if (stats.getTotal() > 0) {
                entries.add(new PieEntry(stats.getTotal(), stats.getMonth()));
            }
        }

        PieDataSet dataSet = new PieDataSet(entries, "Nombre total d'échanges par mois");
        dataSet.setColors(ColorTemplate.COLORFUL_COLORS);

        PieData pieData = new PieData(dataSet);
        pieData.setValueTextSize(16f);
        pieData.setValueTextColor(Color.WHITE);

        donutChart.setData(pieData);
        donutChart.setUsePercentValues(false);
        donutChart.setHoleRadius(50f);
        donutChart.setTransparentCircleRadius(55f);
        donutChart.setCenterText("Total Échanges");
        donutChart.setCenterTextSize(20f);
        donutChart.setCenterTextColor(Color.WHITE);
        donutChart.getDescription().setEnabled(false);
        donutChart.animateY(1000);
        donutChart.invalidate();
    }
}
