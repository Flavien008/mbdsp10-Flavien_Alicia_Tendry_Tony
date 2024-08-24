package com.example.tpt_mbds;

import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;

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

public class AccepteParMoisFragment extends Fragment {

    private PieChart donutChart;

    public static AccepteParMoisFragment newInstance() {
        return new AccepteParMoisFragment();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_accepte_par_mois, container, false);
        donutChart = view.findViewById(R.id.donutChart);

        int userId = TokenManager.getInstance(getContext()).getUserId();
        loadAcceptedExchanges(userId);

        return view;
    }

    private void loadAcceptedExchanges(int userId) {
        DashboardService dashboardService = new DashboardService(getContext());
        dashboardService.fetchExchangeStatsByUser(userId, 2024, new DashboardService.FetchExchangeStatsCallback() {
            @Override
            public void onSuccess(List<ExchangeStats> exchangeStats) {
                displayAcceptedChart(exchangeStats);
            }

            @Override
            public void onError(String message) {
                // Handle error
            }
        });
    }

    private void displayAcceptedChart(List<ExchangeStats> data) {
        List<PieEntry> entries = new ArrayList<>();
        for (ExchangeStats stats : data) {
            if (stats.getAccepted() > 0) {
                entries.add(new PieEntry(stats.getAccepted(), stats.getMonth()));
            }
        }

        PieDataSet dataSet = new PieDataSet(entries, "Nombre d'échanges acceptés par mois");
        dataSet.setColors(ColorTemplate.COLORFUL_COLORS);

        PieData pieData = new PieData(dataSet);
        pieData.setValueTextSize(16f);
        pieData.setValueTextColor(Color.WHITE);

        donutChart.setData(pieData);
        donutChart.setUsePercentValues(false);
        donutChart.setHoleRadius(50f);
        donutChart.setTransparentCircleRadius(55f);
        donutChart.setCenterText("Échanges Acceptés");
        donutChart.setCenterTextSize(20f);
        donutChart.setCenterTextColor(Color.WHITE);
        donutChart.getDescription().setEnabled(false);
        donutChart.animateY(1000);
        donutChart.invalidate();
    }
}
