package itu.mbds.tpt.repository;

import itu.mbds.tpt.entity.Image;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends MongoRepository<Image, String> {

    Optional<Image> findByItemId(int itemId);
}
