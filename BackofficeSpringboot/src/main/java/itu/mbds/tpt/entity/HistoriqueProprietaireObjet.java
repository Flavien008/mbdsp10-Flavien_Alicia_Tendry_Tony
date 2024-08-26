package itu.mbds.tpt.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Document(collection = "historique_proprietaire_objet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoriqueProprietaireObjet {

    @Id
    private String id;

    private int itemId;
    private int userId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}

