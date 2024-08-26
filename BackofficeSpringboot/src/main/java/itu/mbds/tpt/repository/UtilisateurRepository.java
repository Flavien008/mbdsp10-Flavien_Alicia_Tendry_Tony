package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Utilisateur;
import itu.mbds.tpt.entity.stat.AgeGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer>, JpaSpecificationExecutor<Utilisateur> {

    @Query("SELECT COUNT(u) FROM Utilisateur u WHERE u.createAt >= :startDate")
    long countNewUsersInLast24Hours(@Param("startDate") LocalDateTime startDate);

    @Query(value = "SELECT * FROM AgeGroupStats ",nativeQuery = true)
    List<AgeGroup> findAgeGroupStatistics();

    List<Utilisateur> findByUsernameContaining(String username);

    List<Utilisateur> findByEmailContaining(String email);

    List<Utilisateur> findByBirthdayBetween(LocalDate dtnMin, LocalDate dtnMax);

    Utilisateur findByEmail(String email);

}

