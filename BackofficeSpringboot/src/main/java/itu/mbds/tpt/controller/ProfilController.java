package itu.mbds.tpt.controller;

import itu.mbds.tpt.entity.stat.AgeGroup;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/profil")
public class ProfilController {

    @GetMapping("/")
    public ModelAndView profil() {
        String pageActuel = "profil/index";
        ModelAndView model = new ModelAndView("include/" + pageActuel);

        try {

        } catch (Exception e) {
            // Gérer les exceptions et ajouter un message d'erreur au modèle
            e.printStackTrace();
            model.addObject("errorMessage", "Une erreur est survenue lors du chargement des statistiques.");
        }

        model.addObject("pageActuel", pageActuel);
        return model;
    }
}
