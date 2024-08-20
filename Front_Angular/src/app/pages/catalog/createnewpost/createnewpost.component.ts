import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './post.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-post-create',
  templateUrl: './createnewpost.component.html',
  styleUrls: ['./createnewpost.component.scss']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  isSubmitting = false;
  categories: any[] = [];
  items: any[] = []; 
  selectedItems: any[] = []; 
  isLoadingItems: boolean = true; 
  map!: L.Map;
  customMarkerIcon = L.icon({
    iconUrl: 'assets/img/1673221.png', 
    iconSize: [32, 32],
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32]  
  });

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
    this.setCurrentLocationAsDefault(); 
  }

  setCurrentLocationAsDefault(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.initializeMap(latitude, longitude);
        this.postForm.patchValue({ latitude, longitude });
        L.marker([latitude, longitude], { icon: this.customMarkerIcon }).addTo(this.map)
          .bindPopup('Votre position actuelle')
          .openPopup();
      }, (error) => {
        console.error('Erreur lors de l\'obtention de la position:', error);
        this.initializeMap(48.8566, 2.3522);  
      });
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      this.initializeMap(48.8566, 2.3522); 
    }
  }

  initializeMap(lat: number, lng: number): void {
    this.map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.postForm.patchValue({ latitude: lat, longitude: lng });
      L.marker([lat, lng], { icon: this.customMarkerIcon }).addTo(this.map)
        .bindPopup('Position sélectionnée')
        .openPopup();
    });
  }

  fetchItems(): void {
    this.isLoadingItems = true; 
    this.postService.getItems(1, 200000).subscribe(
      (response) => {
        this.items = response.data;
        this.isLoadingItems = false; 
      },
      (error) => {
        console.error('Error fetching items:', error);
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

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.postForm.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        this.map.setView([position.coords.latitude, position.coords.longitude], 13);
        L.marker([position.coords.latitude, position.coords.longitude], { icon: this.customMarkerIcon }).addTo(this.map)
          .bindPopup('Votre position actuelle')
          .openPopup();
      }, (error) => {
        console.error('Erreur lors de l\'obtention de la position:', error);
      });
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  }

  createPost(): void {
    this.isSubmitting = true;
    if (this.postForm.valid && this.selectedItems.length > 0) {
      const postData = {
        ...this.postForm.value,
        items: this.selectedItems.map(item => item.item_id) 
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
    }
  }
}
