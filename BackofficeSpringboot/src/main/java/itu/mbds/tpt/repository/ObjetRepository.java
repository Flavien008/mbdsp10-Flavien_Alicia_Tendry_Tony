package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Objet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjetRepository extends JpaRepository<Objet, Integer>, JpaSpecificationExecutor<Objet> {
}
