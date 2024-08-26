package itu.mbds.tpt.repository;


import itu.mbds.tpt.entity.EchangeDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EchangeDetailRepository extends JpaRepository<EchangeDetail, Long> {
    List<EchangeDetail> findByEchange_Id(Long postId);
}

