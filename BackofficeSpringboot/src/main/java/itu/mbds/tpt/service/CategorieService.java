package itu.mbds.tpt.service;

import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    public Page<Categorie> findAll(Pageable pageable) {
        return categorieRepository.findAll(pageable);
    }

    public Page<Categorie> findByNom(String nom, Pageable pageable) {
        return categorieRepository.findByNomContaining(nom, pageable);
    }

    public Optional<Categorie> findById(int id) {
        return categorieRepository.findById(id);
    }

    public Categorie save(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    public void deleteById(int id) {
        categorieRepository.deleteById(id);
    }
}
