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
@Table(name = "utilisateur")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username",nullable = false)
    private String username;
    @Column(name = "password",nullable = false)
    private String password;
    @Column(name = "email",nullable = false, unique = true)
    private String email;
    @Column(name = "birthday")
    @Temporal(TemporalType.DATE)
    private LocalDate birthday;
    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    @Builder.Default
    private LocalDateTime createAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

}
