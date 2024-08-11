package com.example.tpt_mbds.adapteur;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.R;
import com.example.tpt_mbds.model.Objet;

import java.util.List;

public class ObjetAdapter extends RecyclerView.Adapter<ObjetAdapter.ObjetViewHolder> {

    private Context context;
    private List<Objet> objetList;

    public ObjetAdapter(Context context, List<Objet> objetList) {
        this.context = context;
        this.objetList = objetList;
    }

    @NonNull
    @Override
    public ObjetViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_objet, parent, false);
        return new ObjetViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ObjetViewHolder holder, @SuppressLint("RecyclerView") int position) {
        Objet objet = objetList.get(position);
        holder.titleTextView.setText(objet.getName());
        holder.categoryTextView.setText(objet.getCategory());
        holder.descriptionTextView.setText(objet.getDescription());

        // Decode Base64 string to a Bitmap and set it to the ImageView
        String base64Image = objet.getImageBase64();
        if (base64Image != null && !base64Image.isEmpty()) {
            try {
                byte[] decodedString = Base64.decode(base64Image.split(",")[1], Base64.DEFAULT);
                Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
                holder.objetImage.setImageBitmap(decodedByte);
            } catch (Exception e) {
                e.printStackTrace();
                holder.objetImage.setImageResource(R.drawable.photo); // Fallback image in case of error
            }
        } else {
            holder.objetImage.setImageResource(R.drawable.photo); // Fallback image
        }

        holder.editIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Handle edit action
            }
        });

        holder.deleteIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new AlertDialog.Builder(context)
                        .setTitle("Confirmation")
                        .setMessage("Voulez-vous vraiment supprimer cet objet ?")
                        .setPositiveButton("Oui", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                objetList.remove(position);
                                notifyItemRemoved(position);
                                notifyItemRangeChanged(position, objetList.size());
                            }
                        })
                        .setNegativeButton("Annuler", null)
                        .setIcon(android.R.drawable.ic_dialog_alert)
                        .show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return objetList.size();
    }

    public static class ObjetViewHolder extends RecyclerView.ViewHolder {
        TextView titleTextView, categoryTextView, descriptionTextView;
        ImageView editIcon, deleteIcon, objetImage;

        public ObjetViewHolder(@NonNull View itemView) {
            super(itemView);
            titleTextView = itemView.findViewById(R.id.title_text_view);
            categoryTextView = itemView.findViewById(R.id.category_text_view);
            descriptionTextView = itemView.findViewById(R.id.description_text_view);
            editIcon = itemView.findViewById(R.id.edit_icon);
            deleteIcon = itemView.findViewById(R.id.delete_icon);
            objetImage = itemView.findViewById(R.id.objet_image);
        }
    }
}
