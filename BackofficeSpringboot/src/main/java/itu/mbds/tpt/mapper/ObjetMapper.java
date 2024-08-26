package itu.mbds.tpt.mapper;

import itu.mbds.tpt.dto.ObjetDto;
import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.entity.Image;
import itu.mbds.tpt.entity.Objet;
import itu.mbds.tpt.entity.Utilisateur;
import itu.mbds.tpt.util.Base64MultipartFile;
import itu.mbds.tpt.util.ObjetImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Base64;

@Component
public class ObjetMapper {

    @Autowired
    CategorieMapper categorieMapper;

    @Autowired
    UtilisateurMapper utilisateurMapper;

    public ObjetImage<Objet, Image> toObjet(ObjetDto objetDto) {
        Objet objet = Objet.builder()
                .id(objetDto.getId())
                .nom(objetDto.getNom())
                .description(objetDto.getDescription())
                .categorie(Categorie.builder().id(objetDto.getCategorieId()).build())
                .utilisateur(Utilisateur.builder().id(objetDto.getUtilisateurId()).build())
                .build();
        String imageb64 = null;
        try {
            imageb64 = Base64.getEncoder().encodeToString(objetDto.getImageFile().getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        Image image = new Image();
        image.setItemId(objetDto.getId());
        image.setImg(imageb64);
        return new ObjetImage<Objet, Image>(objet, image);
    }

    public ObjetDto toObjetDto(ObjetImage<Objet, Image> objetImage) {
        Objet objet = objetImage.objet();
        String image = objetImage.image().getImg();
        return ObjetDto.builder()
                .categorieId(objet.getCategorie().getId())
                .utilisateurId(objet.getUtilisateur().getId())
                .nom(objet.getNom())
                .description(objet.getDescription())
                .id(objet.getId())
                .imageFile(new Base64MultipartFile(image,"objet"+objet.getId(),"objet"+objet.getId()+".png","image/*"))
                .build();

    }

    public ObjetDto toObjectDtoSimple(Objet objet){
        return ObjetDto.builder()
                .id(objet.getId())
                .nom(objet.getNom())
                .description(objet.getDescription())
                .categorieId(objet.getCategorie().getId())
                .categorie(categorieMapper.toCategorieDto(objet.getCategorie()))
                .utilisateurId(objet.getUtilisateur().getId())
                .utilisateur(utilisateurMapper.toUtilisateurDto(objet.getUtilisateur()))
                .build();
    }
}
