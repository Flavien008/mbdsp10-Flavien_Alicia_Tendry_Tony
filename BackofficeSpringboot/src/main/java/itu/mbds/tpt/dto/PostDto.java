package itu.mbds.tpt.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {

    private int id;

    @NotNull(message = "L'utilisateur est obligatoire")
    private Integer utilisateurId;

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    private double longitude;

    private double latitude;

    @NotBlank(message = "La description est obligatoire")
    private String description;

    @NotNull(message = "Le statut est obligatoire")
    private Boolean status;

    private List<PostDetailDto> postDetails;
}
