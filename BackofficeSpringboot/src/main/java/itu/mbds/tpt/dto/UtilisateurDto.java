package itu.mbds.tpt.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UtilisateurDto {

    private int id;

    @NotBlank(message = "Le nom d'utilisateur est obligatoire")
    private String username;

    private String password;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    private String email;

    @NotNull(message = "La date de naissance est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @NotNull(message = "Le rôle est obligatoire")
    private Integer roleId;



}
