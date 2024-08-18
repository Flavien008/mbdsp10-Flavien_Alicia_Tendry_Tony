package itu.mbds.tpt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"Objets\"")
public class Objet {

    @Id
    @Column(name = "\"item_id\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "\"name\"", nullable = false)
    private String nom;

    @Column(name = "\"description\"")
    private String description;


    @Column(name = "\"created_at\"", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "\"updated_at\"", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "\"user_id\"", nullable = false)
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "\"categorie_id\"", nullable = false)
    private Categorie categorie;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
