package itu.mbds.tpt.controller;

import itu.mbds.tpt.dto.CategorieDto;
import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.mapper.CategorieMapper;
import itu.mbds.tpt.service.CategorieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/categorie")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;
    @Autowired
    private CategorieMapper categorieMapper;

    @GetMapping("/")
    public String categorie(
            Model model) {

        int page = 0;
        int size = 20;
        String sortBy = "id";
        String nom = "";
        Page<Categorie> categoriePage = categorieService.findAll(page, size, sortBy, nom);

        model.addAttribute("categories", categoriePage.getContent());
        model.addAttribute("totalPages", categoriePage.getTotalPages());
        model.addAttribute("totalElements", categoriePage.getTotalElements());
        model.addAttribute("page", page);
        model.addAttribute("sortBy", sortBy);
        model.addAttribute("size", size);
        model.addAttribute("nom", nom);
        model.addAttribute("currentPage", page);
        String pageActuel = "categorie/index";
        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }


    @GetMapping("/search")
    public String search(@RequestParam String nom,
                         @RequestParam(defaultValue = "0") int page,
                         @RequestParam(defaultValue = "20") int size,
                         @RequestParam(defaultValue = "id") String sortBy,
                         Model model) {
        String pageActuel =     "categorie/index";
        Page<Categorie> categoriePage = categorieService.findAll(page, size, sortBy, nom);
        model.addAttribute("categories", categoriePage.getContent());
        model.addAttribute("totalPages", categoriePage.getTotalPages());
        model.addAttribute("totalElements", categoriePage.getTotalElements());
        model.addAttribute("page", page);
        model.addAttribute("sortBy", sortBy);
        model.addAttribute("size", size);
        model.addAttribute("nom", nom);
        model.addAttribute("currentPage", page);
        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        String pageActuel = "categorie/add";
        model.addAttribute("categorie", new CategorieDto());
        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @PostMapping("/add")
    public String addCategorie(@Valid @ModelAttribute("categorie") CategorieDto categorieDto, BindingResult binding,Model model) {
        String pageActuel = "categorie/add";
        if (binding.hasErrors()) {

            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("categorie", categorieDto);
            model.addAttribute("error", binding.getFieldError().getDefaultMessage());
            return "include/" + pageActuel;
        }
        try {
            categorieService.save(categorieMapper.toCategorie(categorieDto));
        }catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("categorie", categorieDto);
            model.addAttribute("error", e.getMessage());
            return "include/"+pageActuel;
        }

        return "redirect:/categorie";
    }


    @GetMapping("/detail/{id}")
    public String showAddForm(@PathVariable int id, Model model) {
        String pageActuel = "categorie/detail";
        try{
            model.addAttribute("categorie", categorieService.findById(id));
        }catch (Exception e){
            e.printStackTrace();
            model.addAttribute("error", e.getMessage());
        }


        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }
    //
    // @GetMapping("/edit/{id}")
    // public String showEditForm(@PathVariable int id, Model model) {
    // Optional<Categorie> categorie = categorieService.findById(id);
    // if (categorie.isPresent()) {
    // String pageActuel = "categorie/edit";
    // model.addAttribute("categorie", categorie.get());
    // model.addAttribute("pageActuel",pageActuel);
    // return "include"+pageActuel;
    // } else {
    // return "redirect:/categorie";
    // }
    // }
    //
    // @PostMapping("/edit")
    // public String editCategorie(@ModelAttribute Categorie categorie) {
    // categorieService.save(categorie);
    // return "redirect:/categorie";
    // }
    //
    // @GetMapping("/delete/{id}")
    // public String deleteCategorie(@PathVariable int id) {
    // categorieService.deleteById(id);
    // return "redirect:/categorie";
    // }
}
