package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Echange;
import itu.mbds.tpt.entity.stat.EchangeCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EchangeRepository extends JpaRepository<Echange, Integer> {

    @Query("SELECT MONTH(e.createdAt) as month, COUNT(e) as count " +
            "FROM Echange e " +
            "WHERE YEAR(e.createdAt) = :year " +
            "AND (:status IS NULL OR e.status = :status) " +
            "GROUP BY MONTH(e.createdAt)")
    List<EchangeCount> countEchangesByMonthAndStatus(@Param("year") int year, @Param("status") String status);

    long countByStatus(String status);
}
