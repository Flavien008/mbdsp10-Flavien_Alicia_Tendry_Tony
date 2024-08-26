package itu.mbds.tpt.entity;

import itu.mbds.tpt.entity.Objet;
import itu.mbds.tpt.entity.Utilisateur;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "\"HistoriqueProprietaires\"")
public class HistoriqueProprietaireObjet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "\"objet_id\"", referencedColumnName = "\"item_id\"")
    private Objet objet;

    @ManyToOne
    @JoinColumn(name = "\"ancien_proprietaire_id\"")
    private Utilisateur ancienProprietaire;

    @ManyToOne
    @JoinColumn(name = "\"nouveau_proprietaire_id\"", foreignKey = @ForeignKey(name = "HistoriqueProprietaires_nouveau_proprietaire_id_fkey"))
    private Utilisateur nouveauProprietaire;

    @Column(name = "\"date_changement\"")
    private LocalDateTime dateChangement;


}
