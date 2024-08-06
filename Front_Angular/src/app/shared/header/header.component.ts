import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

// Data Get
import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

// Header Component
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

  constructor(public formBuilder: UntypedFormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    // Menu Items
    this.menuItems = MENU;

    // Validation
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.signupformData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.setmenuactive()
  }

  /**
* Returns form
*/
  get form() {
    return this.formData.controls;
  }

  /**
 * Returns signup form
 */
  get signupform() {
    return this.signupformData.controls;
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
  }

  // open modal
  openModal(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }

  /**
* submit signin form
*/
  signin() {
    if (this.formData.valid) {
      const message = this.formData.get('email')!.value;
      const pwd = this.formData.get('password')!.value;
      this.modalService.dismissAll();
    }
    this.submitted = true;
  }

  signup() {
    if (this.signupformData.valid) {
      const message = this.signupformData.get('email')!.value;
      const pwd = this.signupformData.get('password')!.value;
      this.modalService.dismissAll();
    }
    this.signupsubmit = true;
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType
  }

  /**
 * Password Hide/Show
 */
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

  // Menu Link Active
  updateActive(event: any) {
    this.activateParentDropdown(event.target);
  }

  // remove active items of two-column-menu
  activateParentDropdown(item: any) { // navbar-nav menu add active
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".dropdown-menu");
    if (parentCollapseDiv) {
      parentCollapseDiv.parentElement.children[0].classList.add("active")
    }
    return false;
  }

}
