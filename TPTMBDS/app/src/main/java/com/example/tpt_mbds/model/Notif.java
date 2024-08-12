package com.example.tpt_mbds.model;

public class Notif {

    private String title;
    private String message;

    public Notif(String title, String message) {
        this.title = title;
        this.message = message;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }
}