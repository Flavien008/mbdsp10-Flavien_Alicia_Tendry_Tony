import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { CategoryService } from '../categorie.service';
import { ItemCreateService } from './createnewitem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnewitem',
  templateUrl: './createnewitem.component.html',
  styleUrls: ['./createnewitem.component.scss']
})
export class CreatenewitemComponent implements OnInit {

  selectedcategory: any;
  itemData!: UntypedFormGroup;
  submitted = false;
  isSubmitting = false;
  categories: any[] = [];
  files: File[] = [];
  imageBase64Strings: string[] = [];
  successMessage: string | null = null;  // Message de succès
  errorMessage: string | null = null;    // Message d'erreur

  constructor(
    public formBuilder: UntypedFormBuilder,
    private categoryService: CategoryService,
    private itemCreateService: ItemCreateService,
    private router: Router
  ) {
    this.selectedcategory = 'ETH';
  }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;

    this.itemData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.convertFilesToBase64();
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.convertFilesToBase64();
  }

  convertFilesToBase64() {
    this.imageBase64Strings = [];

    this.files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageBase64Strings.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  createitem() {
    this.submitted = true;
    this.successMessage = null;  // Réinitialiser les messages
    this.errorMessage = null;

    const currentUser = sessionStorage.getItem('currentUser'); 
    let userId: number | null = null;
    if (currentUser) {
      const user = JSON.parse(currentUser); 
      userId = user.id; 
    }

    if (this.itemData.valid) {
      this.isSubmitting = true;

      const itemData = {
        user_id: userId,
        categorie_id: this.itemData.get('category')?.value,
        name: this.itemData.get('title')?.value,
        description: this.itemData.get('description')?.value,
        images: this.imageBase64Strings
      };

      this.itemCreateService.createItem(itemData).subscribe(
        (response) => {
          console.log('Item created successfully', response);
          this.successMessage = "L'objet a été créé avec succès.";
          this.isSubmitting = false;
          this.router.navigate(['/auctionlive/'+response.objet.item_id]);
        },
        (error) => {
          console.error('Error creating item', error);
          this.errorMessage = "Une erreur est survenue lors de la création de l'objet. Veuillez réessayer.";
          this.isSubmitting = false;
        }
      );
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  get form() {
    return this.itemData.controls;
  }
}
