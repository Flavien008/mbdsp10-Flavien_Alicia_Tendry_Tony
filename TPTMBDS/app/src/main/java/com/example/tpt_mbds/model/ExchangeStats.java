package com.example.tpt_mbds.model;

public class ExchangeStats {

    private String month;
    private int total;
    private int accepted;

    public ExchangeStats(String month, int total, int accepted) {
        this.month = month;
        this.total = total;
        this.accepted = accepted;
    }

    public String getMonth() {
        return month;
    }

    public int getTotal() {
        return total;
    }

    public int getAccepted() {
        return accepted;
    }
}
