package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Objet;
import itu.mbds.tpt.entity.stat.CategoryCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObjetRepository extends JpaRepository<Objet, Integer>, JpaSpecificationExecutor<Objet> {
    @Query("SELECT o.categorie.nom AS categoryName, COUNT(o) AS count FROM Objet o GROUP BY o.categorie.nom")
    List<CategoryCount> countObjectsByCategory();
}
