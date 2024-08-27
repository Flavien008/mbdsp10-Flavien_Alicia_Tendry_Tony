package itu.mbds.tpt.controller;

import itu.mbds.tpt.dto.UtilisateurDto;
import itu.mbds.tpt.entity.Role;
import itu.mbds.tpt.entity.Utilisateur;
import itu.mbds.tpt.mapper.UtilisateurMapper;
import itu.mbds.tpt.service.RoleService;
import itu.mbds.tpt.service.UtilisateurService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/utilisateur")
public class UtilisateurController {


    @Autowired
    private UtilisateurService utilisateurService;
    @Autowired
    private UtilisateurMapper utilisateurMapper;
    @Autowired
    private RoleService roleService;
    @GetMapping("/")
    public String utilisateur(
            Model model,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "") String nom,
            @RequestParam(defaultValue = "") String email,
            @RequestParam(defaultValue = "") String role,
            @RequestParam(required = false) LocalDate dtnMin,
            @RequestParam(required = false) LocalDate dtnMax) {

        Page<Utilisateur> utilisateurPage = utilisateurService.findAll(page, size, sortBy, nom, email, dtnMin, dtnMax,role);
        List<Role> roles = roleService.findAll();
        model.addAttribute("roles", roles);
        model.addAttribute("utilisateurs", utilisateurPage.getContent());
        model.addAttribute("totalPages", utilisateurPage.getTotalPages());
        model.addAttribute("totalElements", utilisateurPage.getTotalElements());
        model.addAttribute("page", page);
        model.addAttribute("sortBy", sortBy);
        model.addAttribute("size", size);
        model.addAttribute("nom", nom);
        model.addAttribute("email", email);
        model.addAttribute("dtnMin", dtnMin);
        model.addAttribute("dtnMax", dtnMax);
        model.addAttribute("currentPage", page);
        model.addAttribute("role", role);
        String pageActuel = "utilisateur/index";
        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        try {
            String pageActuel = "utilisateur/add";
            model.addAttribute("utilisateur", new UtilisateurDto());
            model.addAttribute("pageActuel", pageActuel);
            List<Role> roles = roleService.findAll();
            model.addAttribute("roles", roles);
            return "include/" + pageActuel;
        }catch (Exception e) {
            e.printStackTrace();
            return "redirect:/utilisateur/";
        }

    }

    @PostMapping("/add")
    public String addUtilisateur(@Valid @ModelAttribute("utilisateur") UtilisateurDto utilisateurDto, BindingResult binding, Model model) {
        String pageActuel = "utilisateur/add";
        if (binding.hasErrors()) {
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("utilisateur", utilisateurDto);
            model.addAttribute("error", binding.getFieldError().getDefaultMessage());
            List<Role> roles = roleService.findAll();
            model.addAttribute("roles", roles);
            return "include/" + pageActuel;
        }
        try {
            utilisateurService.save(utilisateurMapper.toUtilisateur(utilisateurDto));
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("utilisateur", utilisateurDto);
            model.addAttribute("error", e.getMessage());
            List<Role> roles = roleService.findAll();
            model.addAttribute("roles", roles);
            return "include/" + pageActuel;
        }

        return "redirect:/utilisateur/";
    }

    @GetMapping("/detail/{id}")
    public String showDetailForm(@PathVariable int id, Model model) {
        String pageActuel = "utilisateur/detail";
        try {
            Optional<Utilisateur> utilisateurOptional = utilisateurService.findById(id);
            if (utilisateurOptional.isPresent()) {
                Utilisateur utilisateur = utilisateurOptional.get();
                UtilisateurDto utilisateurDto = utilisateurMapper.toUtilisateurDto(utilisateur);
                utilisateurDto.setPassword(null);
                model.addAttribute("utilisateur", utilisateurDto);
            } else {
                return "redirect:/utilisateur/";
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", e.getMessage());
            return "redirect:/utilisateur/";
        }

        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        try {
            Optional<Utilisateur> utilisateurOptional = utilisateurService.findById(id);
            if (utilisateurOptional.isPresent()) {
                String pageActuel = "utilisateur/edit";
                UtilisateurDto utilisateurDto = utilisateurMapper.toUtilisateurDto(utilisateurOptional.get());
                utilisateurDto.setPassword(null);
                model.addAttribute("utilisateur", utilisateurDto);
                model.addAttribute("pageActuel", pageActuel);
                List<Role> roles = roleService.findAll();
                model.addAttribute("roles", roles);
                return "include/" + pageActuel;
            } else {
                return "redirect:/utilisateur/";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/utilisateur/";
        }
    }

    @Transactional
    @PostMapping("/edit")
    public String editUtilisateur(@Valid @ModelAttribute("utilisateur") UtilisateurDto utilisateurDto, BindingResult binding, Model model) {
        String pageActuel = "utilisateur/edit";
        if (binding.hasErrors()) {
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("utilisateur", utilisateurDto);
            model.addAttribute("error", binding.getFieldError().getDefaultMessage());
            List<Role> roles = roleService.findAll();
            model.addAttribute("roles", roles);
            return "include/" + pageActuel;
        }
        try {
            utilisateurService.editUtilisateur(utilisateurMapper.toUtilisateur(utilisateurDto));
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("pageActuel", pageActuel);
            model.addAttribute("utilisateur", utilisateurDto);
            model.addAttribute("error", binding.getFieldError().getDefaultMessage());
            List<Role> roles = roleService.findAll();
            model.addAttribute("roles", roles);
            return "include/" + pageActuel;
        }
        return "redirect:/utilisateur/";
    }

    @GetMapping("/delete/{id}")
    public String deleteUtilisateur(@PathVariable int id) {
        try {
            utilisateurService.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/utilisateur/";
        }
        return "redirect:/utilisateur/";
    }
}
