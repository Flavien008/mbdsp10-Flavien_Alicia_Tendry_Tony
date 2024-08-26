package itu.mbds.tpt.controller;

import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/categorie")
public class CategorieController {

//    @GetMapping("/")
//    public ModelAndView categorie() {
//        String pageActuel = "categorie/index";
//        ModelAndView model = new ModelAndView("include/"+pageActuel);
//        model.addObject("pageActuel", pageActuel);
//        return model;
//    }

    @Autowired
    private CategorieService categorieService;

    @GetMapping("/")
    public String categorie(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size, Model model) {
        String pageActuel = "categorie/index";
        Pageable pageable = PageRequest.of(page, size);
        Page<Categorie> categoriePage = categorieService.findAll(pageable);
        model.addAttribute("categories", categoriePage.getContent());
        model.addAttribute("totalPages", categoriePage.getTotalPages());
        model.addAttribute("currentPage", page);
        model.addAttribute("pageActuel", pageActuel);
        return "include/"+pageActuel;
    }

    @GetMapping("/search")
    public String searchCategories(@RequestParam String nom, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size, Model model) {
        String pageActuel = "categorie/index";
        Pageable pageable = PageRequest.of(page, size);
        Page<Categorie> categoriePage = categorieService.findByNom(nom, pageable);
        model.addAttribute("categories", categoriePage.getContent());
        model.addAttribute("totalPages", categoriePage.getTotalPages());
        model.addAttribute("currentPage", page);
        model.addAttribute("pageActuel", pageActuel);
        return "include/"+pageActuel;
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        String pageActuel = "categorie/add";
        model.addAttribute("categorie", new Categorie());
        model.addAttribute("pageActuel", pageActuel);
        return "include/"+pageActuel;
    }

    @PostMapping("/add")
    public String addCategorie(@ModelAttribute Categorie categorie) {
        categorieService.save(categorie);
        return "redirect:/categories";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Optional<Categorie> categorie = categorieService.findById(id);
        if (categorie.isPresent()) {
            model.addAttribute("categorie", categorie.get());
            return "categories/edit";
        } else {
            return "redirect:/categories";
        }
    }

    @PostMapping("/edit")
    public String editCategorie(@ModelAttribute Categorie categorie) {
        categorieService.save(categorie);
        return "redirect:/categories";
    }

    @GetMapping("/delete/{id}")
    public String deleteCategorie(@PathVariable int id) {
        categorieService.deleteById(id);
        return "redirect:/categories";
    }
}
