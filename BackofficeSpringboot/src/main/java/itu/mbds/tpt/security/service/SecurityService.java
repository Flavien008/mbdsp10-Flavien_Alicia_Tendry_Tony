package itu.mbds.tpt.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class SecurityService {

    @Autowired
    AuthenticationManager authenticationManager;

    public void doLogin(String email, String password){
        UsernamePasswordAuthenticationToken request = new UsernamePasswordAuthenticationToken(email,password);
        Authentication authentication = authenticationManager.authenticate(request);
        if(authentication.isAuthenticated()){
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
}

