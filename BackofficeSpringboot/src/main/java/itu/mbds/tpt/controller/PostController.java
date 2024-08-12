package itu.mbds.tpt.controller;

import itu.mbds.tpt.dto.ObjetDto;
import itu.mbds.tpt.dto.PostDto;
import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.entity.Objet;
import itu.mbds.tpt.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("/")
    public String post(
            Model model,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "") String titre,
            @RequestParam(defaultValue = "") String auteur,
            @RequestParam(defaultValue = "") String status,
            @RequestParam(required = false) LocalDate createdAtMin,
            @RequestParam(required = false) LocalDate createdAtMax) {

        Page<Objet> postPage = postService.findAll(page, size, sortBy, titre, auteur, createdAtMin, createdAtMax, status);
        model.addAttribute("posts", postPage.getContent());
        model.addAttribute("totalPages", postPage.getTotalPages());
        model.addAttribute("totalElements", postPage.getTotalElements());
        model.addAttribute("page", page);
        model.addAttribute("sortBy", sortBy);
        model.addAttribute("size", size);
        model.addAttribute("titre", titre);
        model.addAttribute("auteur", auteur);
        model.addAttribute("createdAtMin", createdAtMin);
        model.addAttribute("createdAtMax", createdAtMax);
        model.addAttribute("currentPage", page);
        model.addAttribute("status", status);
        String pageActuel = "post/index";
        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        try {
            String pageActuel = "post/add";
            model.addAttribute("post", new PostDto());
            model.addAttribute("pageActuel", pageActuel);
            return "include/" + pageActuel;
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/post/";
        }
    }
}
