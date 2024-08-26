package com.example.tpt_mbds.adapteur;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tpt_mbds.R;
import com.example.tpt_mbds.model.Comment;

import java.util.List;

public class CommentAdapter extends RecyclerView.Adapter<CommentAdapter.CommentViewHolder> {

    private List<Comment> commentList;

    public CommentAdapter(List<Comment> commentList) {
        this.commentList = commentList;
    }

    @NonNull
    @Override
    public CommentViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.comment_item, parent, false);
        return new CommentViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CommentViewHolder holder, int position) {
        Comment comment = commentList.get(position);
        holder.commentAuthor.setText(comment.getAuthor());
        holder.commentText.setText(comment.getDescription());
    }

    @Override
    public int getItemCount() {
        return commentList.size();
    }

    public static class CommentViewHolder extends RecyclerView.ViewHolder {
        TextView commentAuthor;
        TextView commentText;
        TextView viewMore;

        public CommentViewHolder(@NonNull View itemView) {
            super(itemView);
            commentAuthor = itemView.findViewById(R.id.comment_author);
            commentText = itemView.findViewById(R.id.comment_text);
            viewMore = itemView.findViewById(R.id.view_more);
        }
    }
}
