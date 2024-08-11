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

    @NotNull(message = "La propriétaire est obligatoire")
    private Integer utilisateurId;

    private MultipartFile imageFile;
}
