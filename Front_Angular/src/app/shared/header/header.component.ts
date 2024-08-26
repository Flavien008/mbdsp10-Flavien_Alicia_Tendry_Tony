import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';

import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: any;
  menuItems: MenuItem[] = [];

  public isCollapsed = true;
  formData!: UntypedFormGroup;
  signupformData!: UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType: any;
  submitted = false;
  signupsubmit = false;

  isLoggedIn = false;
  currentUser: any = null;
  errorMessage: string | null = null;  // Pour stocker le message d'erreur
  isLoading = false;  // Pour gérer l'état de chargement

  constructor(public formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();

    // Menu Items
    this.menuItems = MENU;

    // Validation
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.signupformData = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.setmenuactive();
  }

  get form() {
    return this.formData.controls;
  }

  get signupform() {
    return this.signupformData.controls;
  }

  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    } else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }

  signin() {
    this.submitted = true;
    this.errorMessage = null;
    this.isLoading = true;

    if (this.formData.valid) {
      const email = this.formData.get('email')!.value;
      const password = this.formData.get('password')!.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          this.isLoggedIn = true;
          this.currentUser = this.authService.getCurrentUser();
          this.modalService.dismissAll();
          window.location.reload();
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = error.error?.message || "Échec de la connexion. Veuillez vérifier vos informations d'identification et réessayer.";
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  signup() {
    this.signupsubmit = true;
    this.errorMessage = null;
    this.isLoading = true;

    if (this.signupformData.valid) {
      const username = this.signupformData.get('username')!.value;
      const email = this.signupformData.get('email')!.value;
      const dateNaissance = this.signupformData.get('dateNaissance')!.value;
      const password = this.signupformData.get('password')!.value;
      this.authService.signup(username, email, dateNaissance, password).subscribe(
        response => {
          console.log('Signup successful', response);
          this.isLoggedIn = true;
          this.currentUser = this.authService.getCurrentUser();
          this.modalService.dismissAll();
          window.location.reload();
        },
        error => {
          console.error('Signup failed', error);
          this.errorMessage = error.error?.message || "Échec de l'inscription. Veuillez réessayer.";
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  togglesignupPassfield() {
    this.signupPassfield = !this.signupPassfield;
  }

  setmenuactive() {
    setTimeout(() => {
      const pathName = window.location.pathname;
      const ul = document.getElementById("navbar-nav");
      if (ul) {
        const items = Array.from(ul.querySelectorAll("a.sublink"));
        let activeItems = items.filter((x: any) => x.classList.contains("active"));
        let matchingMenuItem = items.find((x: any) => {
          return x.pathname === pathName;
        });
        this.activateParentDropdown(matchingMenuItem);
      }
    }, 0);
  }

  updateActive(event: any) {
    this.activateParentDropdown(event.target);
  }

  activateParentDropdown(item: any) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".dropdown-menu");
    if (parentCollapseDiv) {
      parentCollapseDiv.parentElement.children[0].classList.add("active");
    }
    return false;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
    window.location.reload();
  }
}
