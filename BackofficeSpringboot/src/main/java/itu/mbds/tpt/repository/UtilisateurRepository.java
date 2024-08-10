package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer>, JpaSpecificationExecutor<Utilisateur> {

    // Exemple de méthode personnalisée pour trouver des utilisateurs par nom
    List<Utilisateur> findByUsernameContaining(String username);

    // Exemple de méthode personnalisée pour trouver des utilisateurs par email
    List<Utilisateur> findByEmailContaining(String email);

    // Exemple de méthode personnalisée pour filtrer par date de naissance
    List<Utilisateur> findByBirthdayBetween(LocalDate dtnMin, LocalDate dtnMax);

    Utilisateur findByEmail(String email);
}
