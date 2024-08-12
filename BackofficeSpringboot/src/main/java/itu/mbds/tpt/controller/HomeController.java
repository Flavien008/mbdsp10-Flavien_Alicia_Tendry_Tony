package itu.mbds.tpt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class HomeController {

    @GetMapping("/")
    public ModelAndView home() {
        String pageActuel = "home/index";
        ModelAndView model = new ModelAndView("include/"+pageActuel);
        model.addObject("pageActuel", pageActuel);
        return model;
    }
}
