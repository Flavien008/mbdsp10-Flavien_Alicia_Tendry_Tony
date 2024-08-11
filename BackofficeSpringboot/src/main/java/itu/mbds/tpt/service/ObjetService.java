package itu.mbds.tpt.service;

import itu.mbds.tpt.entity.Image;
import itu.mbds.tpt.entity.Objet;
import itu.mbds.tpt.repository.ImageRepository;
import itu.mbds.tpt.repository.ObjetRepository;
import itu.mbds.tpt.util.ObjetImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ObjetService {

    @Autowired
    ObjetRepository objetRepository;

    @Autowired
    ImageRepository imageRepository;

    public Page<Objet> findAll(int page, int size, String sortBy, String nom, String proprietaire, LocalDate createAtMin, LocalDate createAtMax, String categorie) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Specification<Objet> spec = Specification.where(null);

        if (nom != null && !nom.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("nom"), "%" + nom + "%"));
        }

        if (proprietaire != null && !proprietaire.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("utilisateur").get("username"), "%" + proprietaire + "%"));
        }

        if(categorie != null && !categorie.isEmpty()){
            spec = spec.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("categorie").get("id"), Integer.parseInt(categorie))));
        }

        if (createAtMin != null && createAtMax != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.between(root.get("createAt"), createAtMin, createAtMax));
        } else if (createAtMin != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("birthday"), createAtMin));
        } else if (createAtMax != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("birthday"), createAtMax));
        }

        return objetRepository.findAll(spec, pageable);
    }

    public void updateObjet(ObjetImage<Objet, Image> objet) throws Exception {
        try{
            Objet ancienObjet = objet.objet();
            Image ancienImage = objet.image();
            ObjetImage<Objet, Image> objetImage = findById(ancienObjet.getId());
            Objet objetToUpdate = objetImage.objet();
            Image imageToUpdate = objetImage.image();
            if(objetToUpdate==null){
                throw new Exception("Objet non trouvé");
            }
            objetToUpdate.setCategorie(ancienObjet.getCategorie());
            objetToUpdate.setNom(ancienObjet.getNom());
            objetToUpdate.setDescription(ancienObjet.getDescription());
            objetToUpdate.setUtilisateur(ancienObjet.getUtilisateur());

            if(imageToUpdate!=null){
                imageToUpdate.setImg(ancienImage.getImg());
                imageRepository.save(imageToUpdate);
            }

        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public ObjetImage<Objet, Image> findById(int id) throws Exception {
        try {
            Optional<Objet> findObjet = objetRepository.findById(id);
            Optional<Image> findImage = imageRepository.findByItemId(id);
            return new ObjetImage<>(findObjet.get(), findImage.get());
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public ObjetImage<Objet,Image> save(ObjetImage<Objet, Image> objetImage) {
        try{
            Objet ancienObjet = objetImage.objet();
            Objet savedObjet = objetRepository.save(ancienObjet);

            Image ancienImage = objetImage.image();
            Image image = new Image();
            image.setItemId(savedObjet.getId());
            image.setImg(ancienImage.getImg());

            Image savedImage = imageRepository.save(image);
            return new ObjetImage<Objet,Image>(savedObjet,savedImage);
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }

    }

    public void deleteById(int id) {
        try{
            Optional<Image> image = imageRepository.findByItemId(id);
            if(image.isPresent()){
                imageRepository.delete(image.get());
            }
            objetRepository.deleteById(id);
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
