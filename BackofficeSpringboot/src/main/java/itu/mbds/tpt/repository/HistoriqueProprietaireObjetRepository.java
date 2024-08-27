package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.HistoriqueProprietaireObjet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoriqueProprietaireObjetRepository extends JpaRepository<HistoriqueProprietaireObjet, Integer> {

    List<HistoriqueProprietaireObjet> findByObjet_Id(int objetId);
}