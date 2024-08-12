package itu.mbds.tpt.security.service;

import itu.mbds.tpt.entity.Utilisateur;
import itu.mbds.tpt.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UtilisateurService utilisateurService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurService.findUtilisateurByEmail(username);
        if(utilisateur == null){
            throw new UsernameNotFoundException("Utilisateur non existant");
        }
        return buildUserForAuthentication(utilisateur);
    }

    public UserDetails buildUserForAuthentication(Utilisateur user){
        List<GrantedAuthority> authorities = Arrays.stream(user.getRole().getNom().split(","))
                .map(role -> new SimpleGrantedAuthority("ROLE_"+role))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(), authorities);
    }

}
