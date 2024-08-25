package itu.mbds.tpt.controller;


import itu.mbds.tpt.dto.ObjetDto;
import itu.mbds.tpt.entity.Categorie;
import itu.mbds.tpt.entity.HistoriqueProprietaireObjet;
import itu.mbds.tpt.entity.Image;
import itu.mbds.tpt.entity.Objet;
import itu.mbds.tpt.mapper.ObjetMapper;
import itu.mbds.tpt.service.CategorieService;
import itu.mbds.tpt.service.HistoriqueProprietaireObjetService;
import itu.mbds.tpt.service.ObjetService;
import itu.mbds.tpt.util.ObjetImage;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/objet")
public class ObjetController {

    @Autowired
    ObjetService objetService;

    @Autowired
    CategorieService categorieService;

    @Autowired
    HistoriqueProprietaireObjetService proprietaireObjetService;

    @Autowired
    ObjetMapper objetMapper;

    @GetMapping("/")
    public String objet(
            Model model,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "") String nom,
            @RequestParam(defaultValue = "") String proprietaire,
            @RequestParam(defaultValue = "") String categorie,
            @RequestParam(required = false) LocalDate createAtMin,
            @RequestParam(required = false) LocalDate createAtMax) {

        Page<Objet> objetPage = objetService.findAll(page, size, sortBy, nom, proprietaire, createAtMin, createAtMax,categorie);
        List<Categorie> categories = categorieService.findAll();
        model.addAttribute("categories", categories);
        model.addAttribute("objets", objetPage.getContent());
        model.addAttribute("totalPages", objetPage.getTotalPages());
        model.addAttribute("totalElements", objetPage.getTotalElements());
        model.addAttribute("page", page);
        model.addAttribute("sortBy", sortBy);
        model.addAttribute("size", size);
        model.addAttribute("nom", nom);
        model.addAttribute("proprietaire", proprietaire);
        model.addAttribute("createAtMin", createAtMin);
        model.addAttribute("createAtMax", createAtMax);
        model.addAttribute("currentPage", page);
        model.addAttribute("categorie", categorie);
        String pageActuel = "objet/index";
        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        try {
            String pageActuel = "objet/add";
            model.addAttribute("objet", new ObjetDto());
            model.addAttribute("pageActuel", pageActuel);
            List<Categorie> categories = categorieService.findAll();
            model.addAttribute("categories", categories);
            return "include/" + pageActuel;
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/objet/";
        }
    }

    @PostMapping("/add")
    public String addObjet(@Valid @ModelAttribute("objet") ObjetDto objetDto, BindingResult binding, Model model) {
        String pageActuel = "objet/add";
        if (binding.hasErrors()) {
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("objet", objetDto);
            model.addAttribute("error", binding.getFieldError().getDefaultMessage());
            List<Categorie> categories = categorieService.findAll();
            model.addAttribute("categories", categories);
            return "include/" + pageActuel;
        }
        try {
            objetService.save(objetMapper.toObjet(objetDto));
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("objet", objetDto);
            model.addAttribute("error", e.getMessage());
            List<Categorie> categories = categorieService.findAll();
            model.addAttribute("categories", categories);
            return "include/" + pageActuel;
        }
        return "redirect:/objet/";
    }

    @GetMapping("/detail/{id}")
    public String showDetailForm(@PathVariable int id, Model model) {
        String pageActuel = "objet/detail";
        try {
            ObjetImage<Objet, Image> objetImage = objetService.findById(id);
            if (objetImage.objet()!=null) {
                model.addAttribute("objet", objetImage.objet());
                model.addAttribute("image", objetImage.image());
            } else {
                return "redirect:/objet/";
            }
            List<HistoriqueProprietaireObjet> historiques = proprietaireObjetService.getHistoriqueByObjetId(id);

            model.addAttribute("historiques", historiques);

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", e.getMessage());
            return "redirect:/objet/";
        }

        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        try {
            ObjetImage<Objet,Image> objetImage = objetService.findById(id);
            if (objetImage.objet()!=null) {
                String pageActuel = "objet/edit";
                ObjetDto objetDto = objetMapper.toObjetDto(objetImage);
                model.addAttribute("objet", objetDto);
                model.addAttribute("image", objetImage.image());
                model.addAttribute("pageActuel", pageActuel);
                List<Categorie> categories = categorieService.findAll();
                model.addAttribute("categories", categories);
                return "include/" + pageActuel;
            } else {
                return "redirect:/objet/";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/objet/";
        }
    }

    @Transactional
    @PostMapping("/edit")
    public String editObjet(@Valid @ModelAttribute("objet") ObjetDto objetDto, BindingResult binding, Model model) {
        String pageActuel = "objet/edit";
        if (binding.hasErrors()) {
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("objet", objetDto);
            model.addAttribute("error", binding.getFieldError().getDefaultMessage());
            List<Categorie> categories = categorieService.findAll();
            model.addAttribute("categories", categories);
            return "include/" + pageActuel;
        }
        try {
            objetService.updateObjet(objetMapper.toObjet(objetDto));
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("objet", objetDto);
            model.addAttribute("error", e.getMessage());
            List<Categorie> categories = categorieService.findAll();
            model.addAttribute("categories", categories);
            return "include/" + pageActuel;
        }
        return "redirect:/objet/";
    }

    @GetMapping("/delete/{id}")
    public String deleteObjet(@PathVariable int id) {
        try {
            objetService.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/objet/";
        }
        return "redirect:/objet/";
    }
}
