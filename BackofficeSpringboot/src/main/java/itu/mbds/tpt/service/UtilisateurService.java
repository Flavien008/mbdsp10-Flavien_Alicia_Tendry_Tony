package itu.mbds.tpt.service;

import itu.mbds.tpt.entity.Role;
import itu.mbds.tpt.entity.Utilisateur;
import itu.mbds.tpt.repository.RoleRepository;
import itu.mbds.tpt.repository.UtilisateurRepository;
import itu.mbds.tpt.security.PasswordConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordConfiguration passwordConfiguration;

    public Utilisateur findUtilisateurByEmail(String email){
        return utilisateurRepository.findByEmail(email);
    }

    public Page<Utilisateur> findAll(int page, int size, String sortBy, String username, String email, LocalDate dtnMin, LocalDate dtnMax, String role) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Specification<Utilisateur> spec = Specification.where(null);

        if (username != null && !username.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("username"), "%" + username + "%"));
        }

        if (email != null && !email.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("email"), "%" + email + "%"));
        }

        if(role != null && !role.isEmpty()){
            spec = spec.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("role").get("id"), Integer.parseInt(role))));
        }

        if (dtnMin != null && dtnMax != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.between(root.get("birthday"), dtnMin, dtnMax));
        } else if (dtnMin != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("birthday"), dtnMin));
        } else if (dtnMax != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("birthday"), dtnMax));
        }

        return utilisateurRepository.findAll(spec, pageable);
    }

    public Optional<Utilisateur> findById(int id) {
        return utilisateurRepository.findById(id);
    }

    public void editUtilisateur(Utilisateur utilisateur) throws Exception{
        try {
            Role role = roleRepository.findById(utilisateur.getRole().getId())
                    .orElseThrow(() -> new RuntimeException("Role not found with id: " + utilisateur.getRole().getId()));

            Optional<Utilisateur> utilisateurOptional = findById(utilisateur.getId());
            if (utilisateurOptional.isPresent()) {
                Utilisateur utilisateurToUpdate = utilisateurOptional.get();
                utilisateurToUpdate.setUsername(utilisateur.getUsername());
                utilisateurToUpdate.setEmail(utilisateur.getEmail());
                utilisateurToUpdate.setBirthday(utilisateur.getBirthday());
                utilisateurToUpdate.setRole(role);
            } else {
                throw new Exception("Utilisateur non trouvé");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }



    public Utilisateur save(Utilisateur utilisateur) throws Exception {
        try {
            Role role = roleRepository.findById(utilisateur.getRole().getId())
                    .orElseThrow(() -> new RuntimeException("Role not found with id: " + utilisateur.getRole().getId()));

            utilisateur.setPassword(passwordConfiguration.passwordEncoder().encode(utilisateur.getPassword()));

            utilisateur.setRole(role);

            Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);

            return savedUtilisateur;
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }

    }

    public void deleteById(int id) {
        utilisateurRepository.deleteById(id);
    }

    public List<Utilisateur> findByUsernameContaining(String username) {
        return utilisateurRepository.findByUsernameContaining(username);
    }

    public List<Utilisateur> findByEmailContaining(String email) {
        return utilisateurRepository.findByEmailContaining(email);
    }

    public List<Utilisateur> findByBirthdayBetween(LocalDate dtnMin, LocalDate dtnMax) {
        return utilisateurRepository.findByBirthdayBetween(dtnMin, dtnMax);
    }

}