package itu.mbds.tpt.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"Utilisateurs\"")
public class Utilisateur {

    @Id
    @Column(name = "\"user_id\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "\"username\"", nullable = false)
    private String username;

    @Column(name = "\"password\"", nullable = false)
    private String password;

    @Column(name = "\"email\"", nullable = false, unique = true)
    private String email;

    @Column(name = "\"dateNaissance\"")
    private LocalDate birthday;

    @Column(name = "\"created_at\"")
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(name = "\"updated_at\"", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "\"role_id\"")
    private Role role;

    @PrePersist
    protected void onCreate() {
        createAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
