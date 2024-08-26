package com.example.tpt_mbds.adapteur;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.EditPostActivity;
import com.example.tpt_mbds.PostDetailsActivity;
import com.example.tpt_mbds.R;
import com.example.tpt_mbds.model.Post;

import java.util.List;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.PostViewHolder> {

    private List<Post> postList;
    private Context context;

    public PostAdapter(List<Post> postList, Context context) {
        this.postList = postList;
        this.context = context;
    }

    @NonNull
    @Override
    public PostViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_post, parent, false);
        return new PostViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PostViewHolder holder, int position) {
        Post post = postList.get(position);
        holder.titleTextView.setText(post.getTitle());
        holder.authorTextView.setText(post.getAuthor());
        holder.categoryTextView.setText(post.getCategory());
        holder.descriptionTextView.setText(post.getDescription());
        holder.locationTextView.setText(post.getLocation());

        holder.editIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, EditPostActivity.class);
                context.startActivity(intent);
            }
        });

        holder.deleteIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new AlertDialog.Builder(context)
                        .setTitle("Confirmation")
                        .setMessage("Voulez-vous vraiment supprimer ce poste ?")
                        .setPositiveButton("Oui", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                int position = holder.getAdapterPosition();  // Obtenez la position actuelle de l'élément
                                if (position != RecyclerView.NO_POSITION) {  // Vérifiez si la position est valide
                                    postList.remove(position);
                                    notifyItemRemoved(position);
                                    notifyItemRangeChanged(position, postList.size());
                                }
                            }
                        })
                        .setNegativeButton("Annuler", null)
                        .setIcon(android.R.drawable.ic_dialog_alert)
                        .show();
            }
        });

        holder.viewDetailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, PostDetailsActivity.class);
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return postList.size();
    }

    public static class PostViewHolder extends RecyclerView.ViewHolder {

        TextView titleTextView;
        TextView authorTextView;
        TextView categoryTextView;
        TextView descriptionTextView;
        TextView locationTextView;
        ImageView editIcon;
        ImageView deleteIcon;

        TextView viewDetailsButton;

        public PostViewHolder(@NonNull View itemView) {
            super(itemView);
            titleTextView = itemView.findViewById(R.id.title_text_view);
            authorTextView = itemView.findViewById(R.id.author_text_view);
            categoryTextView = itemView.findViewById(R.id.category_text_view);
            descriptionTextView = itemView.findViewById(R.id.description_text_view);
            locationTextView = itemView.findViewById(R.id.location_text_view);
            editIcon = itemView.findViewById(R.id.edit_icon);
            deleteIcon = itemView.findViewById(R.id.delete_icon);
            viewDetailsButton = itemView.findViewById(R.id.view_details_button);
        }
    }
}
