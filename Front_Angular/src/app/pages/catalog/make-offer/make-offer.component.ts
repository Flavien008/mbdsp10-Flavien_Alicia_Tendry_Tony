import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from './offer.service';
import { PostService } from '../createnewpost/post.service';

@Component({
  selector: 'app-make-offer',
  templateUrl: './make-offer.component.html',
  styleUrls: ['./make-offer.component.scss']
})
export class MakeOfferComponent implements OnInit {
  offerForm: FormGroup;
  isSubmitting = false;
  items: any[] = []; // Objets disponibles à sélectionner
  selectedItems: any[] = []; // Objets sélectionnés pour l'offre
  isLoadingItems: boolean = true; // Indicateur de chargement
  postId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private postService: PostService,
    private router: Router
  ) {
    this.offerForm = this.fb.group({
      description: ['', Validators.required],
    });

    this.postId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10); // Récupère le post_id depuis l'URL
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.isLoadingItems = true; 
    this.postService.getItems(1, 200000).subscribe(
      (response) => {
        this.items = response.data;
        this.isLoadingItems = false; 
      },
      (error) => {
        console.error('Erreur lors du chargement des objets:', error);
        this.isLoadingItems = false; 
      }
    );
  }

  onSelectItem(item: any): void {
    if (!this.selectedItems.includes(item)) {
      this.selectedItems.push(item);
    }
  }

  onRemoveItem(item: any): void {
    this.selectedItems = this.selectedItems.filter(i => i !== item);
  }

  submitOffer(): void {
    this.isSubmitting = true;

    if (this.offerForm.valid && this.selectedItems.length > 0) {
      const offerData = {
        description: this.offerForm.get('description')!.value,
        status: 'pending',
        post_id: this.postId,
        responder_id: JSON.parse(sessionStorage.getItem('currentUser') || '{}').id, 
        details: this.selectedItems.map(item => ({ objet_id: item.item_id }))
      };

      console.log(offerData); // Debugging

      this.offerService.createOffer(offerData).subscribe(
        response => {
          console.log('Offre soumise avec succès', response);
          this.isSubmitting = false;
          this.router.navigate(['/offer-success']); 
        },
        error => {
          console.error('Erreur lors de la soumission de l\'offre:', error);
          this.isSubmitting = false;
        }
      );
    } else {
      this.isSubmitting = false;
    }
  }
}
