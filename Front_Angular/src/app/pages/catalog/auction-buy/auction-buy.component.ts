import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './auction-buy.service';
import * as L from 'leaflet';
import { firstValueFrom } from 'rxjs';

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
  isLoadingObjects: boolean = true;  // Variable de contrôle pour les objets
  isLoadingComments: boolean = false;
  comments: any[] = [];
  private map!: L.Map;
  currentUser: any;
  newComment: string = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    document.documentElement.scrollTop = 0;

    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Marketplace', link: '/' },
      { label: 'Details de la publication', active: true }
    ];

    const postId = this.route.snapshot.paramMap.get('id');
    
    if (postId) {
      this.loadPostDetails(postId);
      this.loadComments(postId);
    }
  }

  loadPostDetails(postId: string): void {
    this.isLoading = true;
    this.postService.getPostById(postId).subscribe(
      response => {
        this.postDetails = response;
        this.loadObjectsForPost(response.Postedetails);
        this.isLoading = false;
        this.initializeMap();
      },
      error => {
        console.error('Erreur lors du chargement des détails du post:', error);
        this.isLoading = false;
      }
    );
  }

  loadObjectsForPost(postDetails: any[]): void {
    const itemRequests = postDetails.map((detail: any) =>
      firstValueFrom(this.postService.getItemById(detail.Objet.item_id))
    );

    this.isLoadingObjects = true;
    Promise.all(itemRequests).then((responses: any[]) => {
      this.morecollection = responses;
      this.isLoadingObjects = false;
    }).catch(error => {
      console.error('Erreur lors du chargement des objets:', error);
      this.isLoadingObjects = false;
    });
  }

  loadComments(postId: string): void {
    this.isLoadingComments = true;
    this.postService.getCommentsByPostId(postId).subscribe(
      response => {
        this.comments = response;
        this.isLoadingComments = false;
      },
      error => {
        console.error('Error loading comments:', error);
        this.isLoadingComments = false;
      }
    );
  }

  initializeMap(): void {
    if (!this.postDetails || !this.postDetails.longitude || !this.postDetails.latitude) {
      return;
    }

    setTimeout(() => {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }

      if (!this.map) {
        this.map = L.map(mapContainer).setView([this.postDetails.latitude, this.postDetails.longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Créer une icône personnalisée
        const customIcon = L.icon({
          iconUrl: 'assets/img/1673221.png',
          iconSize: [38, 38], 
          iconAnchor: [19, 38],
          popupAnchor: [0, -38] 
        });

        // Ajouter le marqueur avec l'icône personnalisée
        L.marker([this.postDetails.latitude, this.postDetails.longitude], { icon: customIcon })
          .addTo(this.map)
          .bindPopup(this.postDetails.titre)
          .openPopup();
      }
    }, 0);
  }


  submitComment(): void {
    if (this.newComment.trim()) {
      const comment = {
        description: this.newComment,
        auteur_id: this.currentUser.id,
        poste_id: this.postDetails.poste_id
      };
      
      this.postService.createComment(comment).subscribe(
        response => {
          console.log('Commentaire ajouté avec succès');
          this.comments.push(response);
          this.newComment = ''; // Réinitialiser le champ de saisie
          this.loadComments(this.postDetails.poste_id);
        },
        error => {
          console.error('Erreur lors de l\'ajout du commentaire:', error);
        }
      );
    }
  }

  deleteComment(commentId: string, auteurId: string): void {
    if (this.currentUser.id !== this.postDetails.user_id && this.currentUser.id !== auteurId) {
        console.error('Vous n\'avez pas l\'autorisation de supprimer ce commentaire');
        return;
    }

    this.isLoadingComments = true; 
    this.postService.deleteComment(commentId).subscribe(
        () => {
            console.log('Commentaire supprimé avec succès');
            this.comments = this.comments.filter(comment => comment._id !== commentId);
            this.isLoadingComments = false;
        },
        error => {
            console.error('Erreur lors de la suppression du commentaire:', error);
            this.isLoadingComments = false;
        }
    );
  }
}
