package itu.mbds.tpt.entity;


import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"Categories\"")
public class Categorie {

    @Id
    @Column(name = "\"categorie_id\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String nom;
}
