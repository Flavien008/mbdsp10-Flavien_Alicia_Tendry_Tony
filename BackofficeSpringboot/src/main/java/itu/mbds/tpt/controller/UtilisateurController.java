package itu.mbds.tpt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/utilisateur")
public class UtilisateurController {

    @GetMapping("/")
    public ModelAndView utilisateur() {
        String pageActuel = "utilisateur/index";
        ModelAndView model = new ModelAndView("include/"+pageActuel);
        model.addObject("pageActuel", pageActuel);
        return model;
    }
}
