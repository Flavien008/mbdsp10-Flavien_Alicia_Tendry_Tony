package com.example.tpt_mbds.model;

public class Objet {
    private String name;
    private String category;
    private String description;

    public Objet(String name, String category, String description) {
        this.name = name;
        this.category = category;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }
}
