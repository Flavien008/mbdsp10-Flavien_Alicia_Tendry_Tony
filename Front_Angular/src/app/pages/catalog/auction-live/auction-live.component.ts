import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './auction-live.service';

@Component({
  selector: 'app-auction-live',
  templateUrl: './auction-live.component.html',
  styleUrls: ['./auction-live.component.scss']
})
export class AuctionLiveComponent implements OnInit {
  breadCrumbItems = [{ label: 'Accueil', link: '/' }, { label: 'Fiche objet', active: true }];
  item: any;
  isLoading = true; // For loading state
  currentSlide = 0; // Index du slide actuel

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router // Inject the ActivatedRoute to get the route information
  ) { }

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem() {
    this.isLoading = true; // Start loading

    const url = this.route.snapshot.url; // Get the URL segments
    const lastSegment = url[url.length - 1]; // Get the last segment
    const id = lastSegment.path; // Extract the ID from the last segment

    this.itemService.getItemById(id).subscribe(
      response => {
        this.item = response;
        this.isLoading = false; // Stop loading
      },
      error => {
        console.error('Failed to load item', error);
        this.isLoading = false; // Stop loading even if there is an error
      }
    );
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.item.images.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.item.images.length - 1) ? 0 : this.currentSlide + 1;
  }

  editItem() {
    this.router.navigate(['updateitem/'+this.item?.objet?.item_id]);
  }

  // Method to delete the item
  deleteItem() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
      this.itemService.deleteItem(this.item?.objet?.item_id).subscribe(
        response => {
          console.log('Item deleted successfully', response);
          this.router.navigate(['/']);  // Redirect to home or another page after deletion
        },
        error => {
          console.error('Error deleting item', error);
        }
      );
    }
  }
}
