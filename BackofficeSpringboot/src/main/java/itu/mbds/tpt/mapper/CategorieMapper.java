package itu.mbds.tpt.mapper;

import itu.mbds.tpt.dto.CategorieDto;
import itu.mbds.tpt.entity.Categorie;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor

public class CategorieMapper {

    public CategorieDto toCategorieDto(Categorie categorie) {
        return CategorieDto.builder()
                .id(categorie.getId())
                .nom(categorie.getNom())
                .build();
    }

    public Categorie toCategorie(CategorieDto categorieDto) {
       return Categorie.builder()
               .id(categorieDto.getId())
               .nom(categorieDto.getNom())
               .build();
    }
}
