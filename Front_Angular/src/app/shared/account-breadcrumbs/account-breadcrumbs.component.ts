import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-account-breadcrumbs',
  templateUrl: './account-breadcrumbs.component.html',
  styleUrls: ['./account-breadcrumbs.component.scss']
})
export class AccountBreadcrumbsComponent implements OnInit {
  currentUser: any = null; // Stocke les informations de l'utilisateur connecté

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser(); // Récupère l'utilisateur connecté depuis le service d'authentification
  }
}
