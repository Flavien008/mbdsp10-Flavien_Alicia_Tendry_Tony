package itu.mbds.tpt.mapper;

import itu.mbds.tpt.dto.UtilisateurDto;
import itu.mbds.tpt.entity.Role;
import itu.mbds.tpt.entity.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UtilisateurMapper {

    public Utilisateur toUtilisateur(UtilisateurDto utilisateurDto) {
        return Utilisateur.builder()
                .id(utilisateurDto.getId())
                .email(utilisateurDto.getEmail())
                .username(utilisateurDto.getUsername())
                .password(utilisateurDto.getPassword())
                .birthday(utilisateurDto.getBirthday())
                .role(Role.builder().id(utilisateurDto.getRoleId()).build())
                .build();
    }
    public  UtilisateurDto toUtilisateurDto(Utilisateur utilisateur) {
        return UtilisateurDto.builder()
                .id(utilisateur.getId())
                .email(utilisateur.getEmail())
                .username(utilisateur.getUsername())
                .password(utilisateur.getPassword())
                .birthday(utilisateur.getBirthday())
                .roleId(utilisateur.getRole().getId())
                .build();
    }
}
