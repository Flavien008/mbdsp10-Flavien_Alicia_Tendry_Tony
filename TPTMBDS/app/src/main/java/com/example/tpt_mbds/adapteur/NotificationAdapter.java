package com.example.tpt_mbds.adapteur;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.R;
import com.example.tpt_mbds.model.Notif;

import java.util.List;

public class NotificationAdapter extends RecyclerView.Adapter<NotificationAdapter.NotificationViewHolder> {

    private List<Notif> notificationList;

    public NotificationAdapter(List<Notif> notificationList) {
        this.notificationList = notificationList;
    }

    @NonNull
    @Override
    public NotificationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_notification, parent, false);
        return new NotificationViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NotificationViewHolder holder, int position) {
        Notif notification = notificationList.get(position);
        holder.titleTextView.setText(notification.getTitle());
        holder.messageTextView.setText(notification.getMessage());
    }

    @Override
    public int getItemCount() {
        return notificationList.size();
    }

    class NotificationViewHolder extends RecyclerView.ViewHolder {

        TextView titleTextView;
        TextView messageTextView;
        TextView viewButton;

        public NotificationViewHolder(@NonNull View itemView) {
            super(itemView);
            titleTextView = itemView.findViewById(R.id.title_text_view);
            messageTextView = itemView.findViewById(R.id.message_text_view);
            viewButton = itemView.findViewById(R.id.view_button);
        }
    }
}