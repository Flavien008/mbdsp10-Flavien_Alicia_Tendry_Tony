package itu.mbds.tpt.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleDto {

    private int id;
    @NotBlank(message = "Le nom du role est obligatoire")
    private String nom;
}
