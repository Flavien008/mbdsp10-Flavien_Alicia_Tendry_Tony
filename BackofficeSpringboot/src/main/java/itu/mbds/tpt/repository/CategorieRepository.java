package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Categorie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
    @Query("SELECT c FROM Categorie c WHERE LOWER(c.nom) LIKE LOWER(CONCAT('%', :nom, '%'))")
    Page<Categorie> findByNomContaining(String nom, Pageable pageable);
}
