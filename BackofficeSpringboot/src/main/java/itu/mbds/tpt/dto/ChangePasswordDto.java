package itu.mbds.tpt.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChangePasswordDto {

    @NotBlank(message = "L'ancien mot de passe est obligatoire")
    private String ancien;

    @NotBlank(message = "Le nouveau mot de passe est obligatoire")
    private String nouveau;

    @NotBlank(message = "La confirmation du mot de passe est obligatoire")
    private String confirmationNouveau;
}
