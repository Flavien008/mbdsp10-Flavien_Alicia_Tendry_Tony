package com.example.tpt_mbds.model;

public class Comment {

    private String id;
    private String author;
    private String description;

    private String createdAt;

    public Comment(String author, String text) {
        this.author = author;
        this.description = text;
    }

    public Comment(String id, String author, String description, String createdAt) {
        this.id = id;
        this.author = author;
        this.description = description;
        this.createdAt = createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String text) {
        this.description = text;
    }
}
