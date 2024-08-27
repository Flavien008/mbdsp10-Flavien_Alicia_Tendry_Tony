package itu.mbds.tpt.controller;

import itu.mbds.tpt.dto.CategorieDto;
import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.mapper.CategorieMapper;
import itu.mbds.tpt.service.CategorieService;
import jakarta.transaction.Transactional;
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
        String pageActuel = "categorie/index";
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

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        try {
            Optional<Categorie> categorie = categorieService.findById(id);
            if (categorie.isPresent()) {
                String pageActuel = "categorie/edit";
                model.addAttribute("categorie", categorieMapper.toCategorieDto(categorie.get()));
                model.addAttribute("pageActuel", pageActuel);
                return "include/" + pageActuel;
            } else {
                return "redirect:/categorie/";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/categorie/";
        }

    }

    @Transactional
    @PostMapping("/edit")
    public String editCategorie(@Valid @ModelAttribute("categorie") CategorieDto categorieDto,BindingResult binding,Model model) {
        String pageActuel = "categorie/edit";
        if (binding.hasErrors()) {

            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("categorie", categorieDto);
            model.addAttribute("error", binding.getFieldError().getDefaultMessage());
            return "include/" + pageActuel;
        }
        try {
            categorieService.editCategorie(categorieMapper.toCategorie(categorieDto));
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/categorie/";
        }
        return "redirect:/categorie/";
    }

    @GetMapping("/delete/{id}")
    public String deleteCategorie(@PathVariable int id) {
        try {
            categorieService.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/categorie/";
        }
        return "redirect:/categorie/";
    }
}
