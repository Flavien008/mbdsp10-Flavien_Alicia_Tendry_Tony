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
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.exchange_item, parent, false);
        return new ExchangeViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ExchangeViewHolder holder, int position) {
        Exchange exchange = exchangeList.get(position);
        holder.holderTextView.setText(exchange.getHolder());
        holder.objectTextView.setText(exchange.getObject());
        holder.statusButton.setText(exchange.getStatus());

        if (exchange.getStatus().equals("Validé")) {
            holder.statusButton.setBackgroundColor(context.getResources().getColor(android.R.color.holo_green_light));
        } else {
            holder.statusButton.setBackground(context.getResources().getDrawable(R.drawable.button_background));
        }

        holder.statusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Logique de validation
                if (exchange.getStatus().equals("Valider")) {
                    exchange.setStatus("Validé");
                    notifyItemChanged(position);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return exchangeList.size();
    }

    public static class ExchangeViewHolder extends RecyclerView.ViewHolder {

        TextView holderTextView;
        TextView objectTextView;
        Button statusButton;

        public ExchangeViewHolder(@NonNull View itemView) {
            super(itemView);
            holderTextView = itemView.findViewById(R.id.exchange_holder);
            objectTextView = itemView.findViewById(R.id.exchange_object);
            statusButton = itemView.findViewById(R.id.exchange_status);
        }
    }
}
