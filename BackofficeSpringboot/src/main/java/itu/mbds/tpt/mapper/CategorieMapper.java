package itu.mbds.tpt.mapper;

import itu.mbds.tpt.dto.CategorieDto;
import itu.mbds.tpt.entity.Categorie;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor

public class CategorieMapper {

    public CategorieDto toCategorieDto(Categorie categorie) {
        CategorieDto categorieDto = new CategorieDto();
        categorieDto.setId(categorie.getId());
        categorieDto.setNom(categorie.getNom());
        return categorieDto;
    }

    public Categorie toCategorie(CategorieDto categorieDto) {
        Categorie categorie = new Categorie();
        categorie.setId(categorieDto.getId());
        categorie.setNom(categorieDto.getNom());
        return categorie;
    }
}
