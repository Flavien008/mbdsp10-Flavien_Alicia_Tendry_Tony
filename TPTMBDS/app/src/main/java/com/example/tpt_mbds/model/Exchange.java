package com.example.tpt_mbds.model;

public class Exchange {
    private String holder;
    private String object;
    private String status;

    public Exchange(String holder, String object, String status) {
        this.holder = holder;
        this.object = object;
        this.status = status;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
