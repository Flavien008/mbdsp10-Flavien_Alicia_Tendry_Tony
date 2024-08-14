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
  isLoading: boolean = false; 

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true; // Commence le chargement
    this.itemService.getItems(this.page, this.limit).subscribe(
      response => {
        // Ajouter la propriété currentSlide à chaque item
        this.myitems = response.data.map((item: any) => ({ ...item, currentSlide: 0 }));
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

  prevSlide(item: any) {
    item.currentSlide = (item.currentSlide === 0) ? item.images.length - 1 : item.currentSlide - 1;
  }

  nextSlide(item: any) {
    item.currentSlide = (item.currentSlide === item.images.length - 1) ? 0 : item.currentSlide + 1;
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
