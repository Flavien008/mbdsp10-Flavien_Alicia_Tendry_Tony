package itu.mbds.tpt.service;

import itu.mbds.tpt.entity.Categorie;
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

    public Page<Categorie> findAll(int page, int size, String sortBy, String nom) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        if (nom != null && !nom.isEmpty()) {
            return categorieRepository.findByNomContaining(nom, pageable);
        } else {
            return categorieRepository.findAll(pageable);
        }
    }
}
