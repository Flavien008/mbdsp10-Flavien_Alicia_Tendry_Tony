import { Component, OnInit } from '@angular/core';
import { ItemService } from './my-item.service';

@Component({
  selector: 'app-my-item',
  templateUrl: './my-item.component.html',
  styleUrls: ['./my-item.component.scss']
})
export class MyItemComponent implements OnInit {
  myitems: any = [];
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  hasNext: boolean = false;
  hasPrev: boolean = false;
  isLoading: boolean = false; // Pour l'état de chargement

  // Configuration du carousel
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true; // Commence le chargement
    this.itemService.getItems(this.page, this.limit).subscribe(
      response => {
        this.myitems = response.data;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        this.hasNext = response.hasNext;
        this.hasPrev = response.hasPrev;
        this.isLoading = false; // Terminer le chargement
      },
      error => {
        console.error('Failed to load items', error);
        this.isLoading = false; // Terminer le chargement même en cas d'erreur
      }
    );
  }

  goToNextPage() {
    if (this.hasNext) {
      this.page++;
      this.loadItems();
    }
  }

  goToPrevPage() {
    if (this.hasPrev) {
      this.page--;
      this.loadItems();
    }
  }
}
