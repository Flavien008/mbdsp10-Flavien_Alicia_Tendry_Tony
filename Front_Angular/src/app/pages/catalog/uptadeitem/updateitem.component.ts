import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../categorie.service';
import { ItemUpdateService } from './updateitem.service';
import { ItemService } from '../auction-live/auction-live.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './updateitem.component.html',
  styleUrls: ['./updateitem.component.scss']
})
export class UpdateItemComponent implements OnInit {

  itemData!: UntypedFormGroup;
  submitted = false;
  isSubmitting = false;  
  categories: any[] = [];
  files: File[] = [];
  imageBase64Strings: string[] = [];
  itemId: string;
  isLoading = true;
  item: any;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private itemUpdateService: ItemUpdateService,
    private router: Router,
    private itemService: ItemService,
  ) {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1];
    this.itemId = lastSegment.path;
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

    this.loadItem();
  }

  loadItem() {
    this.isLoading = true;

    const id = this.itemId;

    this.itemService.getItemById(id).subscribe(
      response => {
        this.item = response;
        this.isLoading = false;

        // Remplir le formulaire avec les données existantes
        this.itemData.patchValue({
          title: this.item.objet.name,
          category: this.item.objet.categorie_id,
          description: this.item.objet.description,
        });

        // Si des images existent, les convertir en base64 et les ajouter au tableau
        this.item.images.forEach((image: any) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageBase64Strings.push(e.target.result);
            // Simuler un fichier pour ngx-dropzone
            const simulatedFile = new File([e.target.result], "image.png", { type: "image/png" });
            this.files.push(simulatedFile);
          };
          reader.readAsDataURL(this.convertBase64ToBlob(image.img));
        });
      },
      error => {
        console.error('Failed to load item', error);
        this.isLoading = false;
      }
    );
  }

  convertBase64ToBlob(base64: string) {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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

  updateItem() {
    this.submitted = true;

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

      this.itemUpdateService.updateItem(this.itemId, itemData).subscribe(
        (response) => {
          console.log('Item updated successfully', response);
          this.router.navigate(['/success']);
        },
        (error) => {
          console.error('Error updating item', error);
          this.isSubmitting = false;
        },
        () => {
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
