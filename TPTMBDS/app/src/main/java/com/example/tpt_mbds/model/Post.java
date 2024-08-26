package com.example.tpt_mbds.model;

public class Post {

    private String title;
    private String author;
    private String category;
    private String description;
    private String location;

    public Post(String title, String author, String category, String description, String location) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.location = location;
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
}
