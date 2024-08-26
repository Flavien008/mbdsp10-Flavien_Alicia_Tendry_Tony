package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.PostDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostDetailRepository extends JpaRepository<PostDetail, Long> {
    List<PostDetail> findByPost_Id(Long postId);
}
