package itu.mbds.tpt.controller;

import itu.mbds.tpt.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    DashboardService dashboardService;

    @GetMapping("/")
    public ModelAndView home(@RequestParam(defaultValue = "2024") int year,
                             @RequestParam(defaultValue = "") String status) {
        String pageActuel = "home/index";
        ModelAndView model = new ModelAndView("include/" + pageActuel);

        try {
            // Récupérer les statistiques et les ajouter au modèle
            long totalUtilisateurs = dashboardService.getTotalUtilisateurs();
            long nouveauxUtilisateurs = dashboardService.getNouveauxUtilisateurs();
            long totalObjets = dashboardService.getTotalObjets();
            long totalPosts = dashboardService.getTotalPosts();

            model.addObject("totalUtilisateurs", totalUtilisateurs);
            model.addObject("nouveauxUtilisateurs", nouveauxUtilisateurs);
            model.addObject("totalObjets", totalObjets);
            model.addObject("totalPosts", totalPosts);

            model.addObject("categoriesData", dashboardService.getTopCategoriesWithOthers());

            var echangesByMonthAndStatus = dashboardService.getEchangesByMonthAndStatus(year, status);
            model.addObject("echangesByMonthAndStatus", echangesByMonthAndStatus);
            model.addObject("year", year);
            model.addObject("status", status);
        } catch (Exception e) {
            // Gérer les exceptions et ajouter un message d'erreur au modèle
            e.printStackTrace();
            model.addObject("errorMessage", "Une erreur est survenue lors du chargement des statistiques.");
        }

        model.addObject("pageActuel", pageActuel);
        return model;
    }


}
