package itu.mbds.tpt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/post")
public class PostController {

    @GetMapping("/")
    public ModelAndView post() {
        String pageActuel = "post/index";
        ModelAndView model = new ModelAndView("include/"+pageActuel);
        model.addObject("pageActuel", pageActuel);
        return model;
    }
}
