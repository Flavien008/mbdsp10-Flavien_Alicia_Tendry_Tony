import { Component, OnInit } from '@angular/core';

// Data Get
import { collections } from 'src/app/pages/account/my-collection/data';
import { favorite } from 'src/app/pages/account/favorite/data';
import { items } from 'src/app/pages/account/my-item/data';

@Component({
  selector: 'app-acount-sidemenu',
  templateUrl: './acount-sidemenu.component.html',
  styleUrls: ['./acount-sidemenu.component.scss']
})

// AcountSidemenu Component
export class AcountSidemenuComponent implements OnInit {

  public isCollapsed = true;
  favorites: any;
  collections: any;
  myitems: any;

  constructor() {
    // Fetch Data
    this.favorites = favorite
    this.collections = collections
    this.myitems = items
  }

  ngOnInit(): void {
    setTimeout(() => {
      const pathName = window.location.pathname;
      const items = Array.from(document.querySelectorAll("a.menulist"));
      let matchingMenuItem = items.find((x: any) => {
        return x.pathname === pathName;
      });
      matchingMenuItem?.classList.add('active')
    }, 0);
  }

}
