package com.example.tpt_mbds.model;

public class Post {

    private int postId;
    private String title;
    private String author;
    private String category;
    private String description;
    private String location;
    private String imageBase64;

    public Post(int postId, String title, String author, String category, String description, String location, String imageBase64) {
        this.postId = postId;
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.location = location;
        this.imageBase64 = imageBase64;
    }

    // Getters and setters for each field

    public int getPostId() {
        return postId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public String getImageBase64() {
        return imageBase64;
    }
}
