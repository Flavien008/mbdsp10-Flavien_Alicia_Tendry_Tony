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
@Table(name = "\"Postedetails\"")
public class PostDetail {

    @Id
    @Column(name = "\"poste_details_id\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "\"post_id\"", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "\"item_id\"", nullable = false)
    private Objet objet;

}
