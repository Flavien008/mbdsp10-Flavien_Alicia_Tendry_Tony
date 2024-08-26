package itu.mbds.tpt.service;

import itu.mbds.tpt.entity.Utilisateur;
import itu.mbds.tpt.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {

    private UtilisateurRepository utilisateurRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UtilisateurService(UtilisateurRepository utilisateurRepository,@Lazy BCryptPasswordEncoder bCryptPasswordEncoder){
        this.utilisateurRepository = utilisateurRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Utilisateur findUtilisateurByEmail(String email){
        return utilisateurRepository.findByEmail(email);
    }


}