package itu.mbds.tpt.service;

import itu.mbds.tpt.entity.Objet;
import itu.mbds.tpt.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    public long count() {
        return postRepository.count();
    }

    public Page<Objet> findAll(int page, int size, String sortBy, String titre, String auteur, LocalDate createdAtMin, LocalDate createdAtMax, String status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Specification<Objet> spec = Specification.where(null);

        if (titre != null && !titre.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("titre"), "%" + titre + "%"));
        }

        if (auteur != null && !auteur.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("utilisateur").get("username"), "%" + auteur + "%"));
        }

        if(status != null && !status.isEmpty()){
            spec = spec.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("status"), Boolean.parseBoolean(status))));
        }

        if (createdAtMin != null && createdAtMax != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.between(root.get("createdAt"), createdAtMin, createdAtMax));
        } else if (createdAtMin != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), createdAtMin));
        } else if (createdAtMax != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), createdAtMax));
        }

        return postRepository.findAll(spec, pageable);
    }
}
