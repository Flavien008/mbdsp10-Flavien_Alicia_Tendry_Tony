package itu.mbds.tpt.controller;

import itu.mbds.tpt.dto.EchangeDetailDto;
import itu.mbds.tpt.dto.ObjetDto;
import itu.mbds.tpt.dto.PostDetailDto;
import itu.mbds.tpt.dto.PostDto;
import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.entity.Echange;
import itu.mbds.tpt.entity.Objet;
import itu.mbds.tpt.entity.Post;
import itu.mbds.tpt.service.EchangeDetailService;
import itu.mbds.tpt.service.EchangeService;
import itu.mbds.tpt.service.PostDetailService;
import itu.mbds.tpt.service.PostService;
import itu.mbds.tpt.util.Constante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    PostDetailService postDetailService;
    @Autowired
    EchangeService echangeService;

    @Autowired
    EchangeDetailService echangeDetailService;

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
        model.addAttribute("cloture", Constante.STATUS_ACCEPTE_LABEL);
        model.addAttribute("nonCloture",Constante.STATUS_REFUSE_LABEL);
        return "include/" + pageActuel;
    }

    @GetMapping("/detail/{id}")
    public String showAddForm(@PathVariable int id, Model model) {
        try {
            String pageActuel = "post/detail";
            Optional<Post> postOptional = postService.findPostById(id);
            List<PostDetailDto> postDetails = postDetailService.getPostDetailsWithImages((long)id);
            List<Echange> echanges = echangeService.getEchangesByPostId(id);

            if(postOptional.isPresent()){
                model.addAttribute("post", postOptional.get());
                model.addAttribute("postDetails", postDetails);
                model.addAttribute("echanges", echanges);
            }else{
                return "redirect:/post/";
            }

            model.addAttribute("pageActuel", pageActuel);
            return "include/" + pageActuel;
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/post/";
        }
    }

    @GetMapping("/echange/detail/{id}")
    public String echangeDetail(@PathVariable int id, Model model) {
        try {
            String pageActuel = "post/echangeDetail";
            Optional<Echange> echangeOptional = echangeService.findEchangeById(id);
            List<EchangeDetailDto> echangeDetails = echangeDetailService.getEchangeDetailsWithImages((long)id);

            if(echangeOptional.isPresent()){
                model.addAttribute("echange", echangeOptional.get());
                model.addAttribute("echangeDetails", echangeDetails);
            }else{
                return "redirect:/post/";
            }

            model.addAttribute("pageActuel", pageActuel);
            return "include/" + pageActuel;
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/post/";
        }
    }
}
