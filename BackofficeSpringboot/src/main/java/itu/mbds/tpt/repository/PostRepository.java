package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PostRepository extends JpaRepository<Post, Integer>, JpaSpecificationExecutor {
}
