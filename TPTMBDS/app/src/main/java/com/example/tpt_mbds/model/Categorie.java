package com.example.tpt_mbds.model;

public class Categorie {
    private String nom;

    public Categorie(String nom) {
        this.nom = nom;
    }

    public String getNom() {
        return nom;
    }

    @Override
    public String toString() {
        return nom;  // Cela est nécessaire pour afficher le nom dans le Spinner
    }
}
