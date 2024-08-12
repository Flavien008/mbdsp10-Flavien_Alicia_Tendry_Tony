package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Categorie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
    Page<Categorie> findByNomContaining(String nom, Pageable pageable);
}
