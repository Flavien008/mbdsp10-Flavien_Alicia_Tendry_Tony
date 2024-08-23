package com.example.tpt_mbds.adapteur;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.VolleyError;
import com.example.tpt_mbds.R;
import com.example.tpt_mbds.model.Exchange;
import com.example.tpt_mbds.service.ExchangeService;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class ExchangeAdapter extends RecyclerView.Adapter<ExchangeAdapter.ExchangeViewHolder> {

    private List<Exchange> exchangeList;
    private Context context;

    public ExchangeAdapter(List<Exchange> exchangeList, Context context) {
        this.exchangeList = exchangeList;
        this.context = context;
    }

    @NonNull
    @Override
    public ExchangeViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.exchange_item, parent, false);
        return new ExchangeViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ExchangeViewHolder holder, int position) {
        Exchange exchange = exchangeList.get(position);
        holder.exchangeHolder.setText(exchange.getProposerUsername());
        holder.exchangeObject.setText(exchange.getObjectNames().get(0)); // Assuming one object per exchange

        if ("pending".equals(exchange.getStatus())) {
            holder.exchangeStatus.setText("Valider");
            holder.exchangeStatus.setEnabled(true);
            holder.exchangeStatus.setBackgroundResource(R.drawable.button_background); // Default button background

            holder.exchangeStatus.setOnClickListener(v -> {
                // Appel API pour valider l'échange
                ExchangeService exchangeService = new ExchangeService(context);
                exchangeService.updateEchange(exchange.getId(), "validé", new ExchangeService.UpdateEchangeCallback() {
                    @Override
                    public void onSuccess(JSONObject response) {
                        try {
                            exchange.setStatus("validé"); // Update status in the local model
                            holder.exchangeStatus.setText("Validé");
                            holder.exchangeStatus.setEnabled(false);
                            holder.exchangeStatus.setBackgroundResource(R.drawable.button_background_disabled); // Grayed out background
                            Toast.makeText(context, response.getString("message"), Toast.LENGTH_SHORT).show();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    @Override
                    public void onError(VolleyError error) {
                        Toast.makeText(context, "Erreur lors de la validation de l'échange", Toast.LENGTH_SHORT).show();
                    }
                });
            });
        } else {
            holder.exchangeStatus.setText("Validé");
            holder.exchangeStatus.setEnabled(false);
            holder.exchangeStatus.setBackgroundResource(R.drawable.button_background_disabled); // Grayed out background
        }
    }

    @Override
    public int getItemCount() {
        return exchangeList.size();
    }

    static class ExchangeViewHolder extends RecyclerView.ViewHolder {
        TextView exchangeHolder;
        TextView exchangeObject;
        Button exchangeStatus;

        public ExchangeViewHolder(@NonNull View itemView) {
            super(itemView);
            exchangeHolder = itemView.findViewById(R.id.exchange_holder);
            exchangeObject = itemView.findViewById(R.id.exchange_object);
            exchangeStatus = itemView.findViewById(R.id.exchange_status);
        }
    }
}
