package itu.mbds.tpt.service;


import itu.mbds.tpt.entity.HistoriqueProprietaireObjet;
import itu.mbds.tpt.repository.HistoriqueProprietaireObjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoriqueProprietaireObjetService {

    @Autowired
    private  HistoriqueProprietaireObjetRepository historiqueProprietaireObjetRepository;


    // Méthode pour récupérer l'historique des propriétaires d'un objet donné
    public List<HistoriqueProprietaireObjet> getHistoriqueByObjetId(int objetId) {
        return historiqueProprietaireObjetRepository.findByObjet_Id(objetId);
    }
}
