package itu.mbds.tpt.controller;

import itu.mbds.tpt.dto.ChangePasswordDto;
import itu.mbds.tpt.dto.UtilisateurDto;
import itu.mbds.tpt.entity.Utilisateur;
import itu.mbds.tpt.mapper.UtilisateurMapper;
import itu.mbds.tpt.service.UtilisateurService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/profil")
public class ProfilController {

    @Autowired
    UtilisateurService utilisateurService;

    @Autowired
    UtilisateurMapper utilisateurMapper;

    @GetMapping("/")
    public String profil(@AuthenticationPrincipal UserDetails user, Model model) {
        String pageActuel = "profil/index";
        try {
            Utilisateur utilisateur = utilisateurService.findUtilisateurByEmail(user.getUsername());
            model.addAttribute("utilisateur", utilisateur);
            model.addAttribute("changePassword", new ChangePasswordDto());
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Une erreur est survenue lors du chargement de l'utilisateur.");
        }

        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @GetMapping("/edit")
    public String edit(@AuthenticationPrincipal UserDetails user, Model model) {
        String pageActuel = "profil/edit";
        try {
            Utilisateur utilisateur = utilisateurService.findUtilisateurByEmail(user.getUsername());
            if(utilisateur!=null){
                UtilisateurDto utilisateurDto = utilisateurMapper.toUtilisateurDto(utilisateur);
                model.addAttribute("utilisateur", utilisateurDto);
            }else{
                throw new Exception("Utilisateur introuvable");
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Une erreur est survenue lors du chargement de l'utilisateur.");
        }

        model.addAttribute("pageActuel", pageActuel);
        return "include/" + pageActuel;
    }

    @Transactional
    @PostMapping("/edit")
    public String edit(@AuthenticationPrincipal UserDetails userDetails,
                               @Valid UtilisateurDto utilisateur,
                               BindingResult bindingResult,
                               RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("errorMessage", bindingResult.getAllErrors().get(0).getDefaultMessage());
            return "redirect:/profil/edit";
        }

        try {
            utilisateurService.editUtilisateur(utilisateurMapper.toUtilisateur(utilisateur));
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            return "redirect:/profil/edit";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            return "redirect:/profil/edit";
        }

        return "redirect:/profil/";
    }

    @PostMapping("/editPassword")
    public String editPassword(@AuthenticationPrincipal UserDetails userDetails,
                               @Valid ChangePasswordDto changePasswordDto,
                               BindingResult bindingResult,
                               RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("errorMessagePassword", "Il y a des erreurs dans le formulaire");
            return "redirect:/profil/edit";
        }

        try {
            utilisateurService.changePassword(userDetails.getUsername(), changePasswordDto);
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("errorMessagePassword", e.getMessage());
            return "redirect:/profil/edit";
        }

        return "redirect:/logout";
    }

}
