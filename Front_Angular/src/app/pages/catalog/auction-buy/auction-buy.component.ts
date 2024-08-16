import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './auction-buy.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-auction-buy',
  templateUrl: './auction-buy.component.html',
  styleUrls: ['./auction-buy.component.scss']
})
export class AuctionBuyComponent implements OnInit {
  postDetails: any;
  morecollection: any[] = [];
  breadCrumbItems!: any;
  isLoading: boolean = true;
  private map!: L.Map;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;

    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Marketplace', link: '/' },
      { label: 'Details de la publication', active: true }
    ];

    // Récupérer l'ID du post à partir de l'URL
    const postId = this.route.snapshot.paramMap.get('id');
    
    // Charger les détails du post
    if (postId) {
      this.loadPostDetails(postId);
    }
  }

  loadPostDetails(postId: string): void {
    this.isLoading = true;
    this.postService.getPostById(postId).subscribe(
      response => {
        this.postDetails = response;
        this.morecollection = response.Postedetails.map((detail: any) => detail.Objet);
        this.isLoading = false;
        this.initializeMap(); // Initialiser la carte après avoir chargé les détails du post
      },
      error => {
        console.error('Erreur lors du chargement des détails du post:', error);
        this.isLoading = false;
      }
    );
  }

  initializeMap(): void {
    console.log('Initializing map...');
    if (!this.postDetails || !this.postDetails.longitude || !this.postDetails.latitude) {
        console.warn('No post details or coordinates available');
        return;
    }

    // Utiliser setTimeout pour différer l'initialisation de la carte
    setTimeout(() => {
        const mapContainer = document.getElementById('map');
        console.log('Map container:', mapContainer);
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }

        if (!this.map) {
            console.log('Creating map...');
            this.map = L.map(mapContainer).setView([this.postDetails.latitude, this.postDetails.longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);

            L.marker([this.postDetails.latitude, this.postDetails.longitude]).addTo(this.map)
                .bindPopup(this.postDetails.titre)
                .openPopup();
        }
    }, 0); // Lancer après l'affichage du DOM
}

}
