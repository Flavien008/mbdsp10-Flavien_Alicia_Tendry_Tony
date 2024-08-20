package itu.mbds.tpt.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategorieDto {

    int id;
    @NotEmpty(message = "Le nom de la catégorie ne doit pas être vide.")
    String nom;
}
