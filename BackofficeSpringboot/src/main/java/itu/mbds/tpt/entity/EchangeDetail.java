package itu.mbds.tpt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"EchangeDetails\"")
public class EchangeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "\"echange_id\"", nullable = false)
    private Echange echange;

    @ManyToOne
    @JoinColumn(name = "\"objet_id\"", nullable = false)
    private Objet objet;
}
