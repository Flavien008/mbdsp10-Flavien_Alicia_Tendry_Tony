package com.example.tpt_mbds.model;

public class Objet {
    private int id;
    private String name;
    private String categorie;
    private String description;
    private String imageBase64;

    public Objet(int id, String name, String categorie, String description, String imageBase64) {
        this.id = id;
        this.name = name;
        this.categorie = categorie;
        this.description = description;
        this.imageBase64 = imageBase64;
    }

    public Objet(String name, String categorie, String description) {
        this.name = name;
        this.categorie = categorie;
        this.description = description;
    }
    public String getName() {
        return name;
    }

    public String getCategory() {
        return categorie;
    }

    public String getDescription() {
        return description;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    @Override
    public String toString() {
        return name;
    }
}
