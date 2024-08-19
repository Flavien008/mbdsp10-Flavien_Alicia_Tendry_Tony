import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './createnewpost.component.html',
  styleUrls: ['./createnewpost.component.scss']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  isSubmitting = false;
  categories: any[] = [];
  items: any[] = []; // Objets disponibles à sélectionner
  selectedItems: any[] = []; // Objets sélectionnés pour la publication
  isLoadingItems: boolean = true; // Variable de contrôle pour le chargement des objets

  constructor(
    private fb: FormBuilder,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.isLoadingItems = true; // Commence le chargement
    this.postService.getItems(1, 200000).subscribe(
      (response) => {
        this.items = response.data;
        this.isLoadingItems = false; // Arrête le chargement après réception des données
      },
      (error) => {
        console.error('Error fetching items:', error);
        this.isLoadingItems = false; // Arrête le chargement en cas d'erreur
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

  createPost(): void {
    this.isSubmitting = true;
    if (this.postForm.valid && this.selectedItems.length > 0) {
      const postData = {
        ...this.postForm.value,
        items: this.selectedItems.map(item => item.item_id) // Extraire les IDs des objets sélectionnés
      };

      console.log(postData);

      this.postService.createPost(postData).subscribe(
        response => {
          console.log('Publication créée avec succès', response);
          this.isSubmitting = false;
          this.postForm.reset();
          this.selectedItems = [];
        },
        error => {
          console.error('Erreur lors de la création de la publication:', error);
          this.isSubmitting = false;
        }
      );
    } else {
      this.isSubmitting = false;
      // Gérer le cas où le formulaire est invalide ou aucun objet n'est sélectionné
    }
  }
}
