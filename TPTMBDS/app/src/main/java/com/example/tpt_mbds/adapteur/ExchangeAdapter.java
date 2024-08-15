package com.example.tpt_mbds.adapteur;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.R;
import com.example.tpt_mbds.model.Exchange;

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
        } else {
            holder.exchangeStatus.setText("Validé");
            holder.exchangeStatus.setEnabled(false);
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
