package itu.mbds.tpt.service;

import itu.mbds.tpt.dto.CategorieDto;
import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.mapper.CategorieMapper;
import itu.mbds.tpt.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;
    @Autowired
    private CategorieMapper categorieMapper;

    

    public Page<Categorie> findByNom(String nom, Pageable pageable) {
        return categorieRepository.findByNomContaining(nom, pageable);
    }

    public Optional<Categorie> findById(int id) {
        return categorieRepository.findById(id);
    }

    public void editCategorie(Categorie categorie) throws Exception{
        try{
            Optional<Categorie> categorieOptional = findById(categorie.getId());
            if (categorieOptional.isPresent()) {
                Categorie categorieToUpdate = categorieOptional.get();
                categorieToUpdate.setNom(categorie.getNom());
            } else {
                throw new Exception("Catégorie non trouvée");
            }
        }catch (Exception e){
            throw e;
        }
    }

    public Categorie save(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    public void deleteById(int id) {
        categorieRepository.deleteById(id);
    }

    public Page<Categorie> findAll(int page, int size, String sortBy, String nom) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        if (nom != null && !nom.isEmpty()) {
            return categorieRepository.findByNomContaining(nom, pageable);
        } else {
            return categorieRepository.findAll(pageable);
        }
    }
}
