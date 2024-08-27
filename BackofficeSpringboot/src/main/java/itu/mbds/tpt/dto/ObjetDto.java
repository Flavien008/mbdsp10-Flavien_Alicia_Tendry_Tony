package itu.mbds.tpt.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ObjetDto {

    private int id;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    private String description;

    @NotNull(message = "La catégorie est obligatoire")
    private Integer categorieId;

    public CategorieDto categorie;

    @NotNull(message = "La propriétaire est obligatoire")
    private Integer utilisateurId;

    public UtilisateurDto utilisateur;

    private MultipartFile imageFile;
}
