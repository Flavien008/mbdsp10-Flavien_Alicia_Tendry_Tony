package itu.mbds.tpt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"Echanges\"")
public class Echange {

    @Id
    @Column(name = "\"id\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "\"responder_id\"", nullable = false)
    private Utilisateur responder;

    @Column(name = "\"description\"")
    private String description;

    @Column(name = "\"created_at\"", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "\"updated_at\"", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "\"post_id\"", nullable = false)
    private Post post;

    @Column(name = "\"status\"", length = 20, nullable = false)
    private String status;

    @OneToMany(mappedBy = "echange", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EchangeDetail> echangeDetails;
}
