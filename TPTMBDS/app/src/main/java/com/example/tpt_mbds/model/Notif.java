package com.example.tpt_mbds.model;

public class Notif {
    private String id;
    private String message;
    private String createdAt;
    private boolean isRead;

    public Notif(String id, String message, String createdAt, boolean isRead) {
        this.id = id;
        this.message = message;
        this.createdAt = createdAt;
        this.isRead = isRead;
    }

    public String getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public boolean isRead() {
        return isRead;
    }
}
