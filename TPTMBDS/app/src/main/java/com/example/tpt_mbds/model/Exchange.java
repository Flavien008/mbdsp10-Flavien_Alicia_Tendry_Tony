package com.example.tpt_mbds.model;

import java.util.List;

public class Exchange {
    private int id;
    private String proposerUsername;
    private String responderUsername;
    private String postTitle;
    private String status;
    private List<String> objectNames;

    public Exchange(int id, String proposerUsername, String responderUsername, String postTitle, String status, List<String> objectNames) {
        this.id = id;
        this.proposerUsername = proposerUsername;
        this.responderUsername = responderUsername;
        this.postTitle = postTitle;
        this.status = status;
        this.objectNames = objectNames;
    }

    public int getId() {
        return id;
    }

    public String getProposerUsername() {
        return proposerUsername;
    }

    public String getResponderUsername() {
        return responderUsername;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public String getStatus() {
        return status;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setProposerUsername(String proposerUsername) {
        this.proposerUsername = proposerUsername;
    }

    public void setResponderUsername(String responderUsername) {
        this.responderUsername = responderUsername;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getObjectNames() {
        return objectNames;
    }
}
