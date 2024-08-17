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
  comments: any[] = [];
  private map!: L.Map;
  currentUser : any;
  newComment: string = '';
  isLoadingComments: boolean = false;

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
    if(!this.isLoading){
      console.log(this.postDetails)
    }
  }

  loadPostDetails(postId: string): void {
    this.isLoading = true;
    this.postService.getPostById(postId).subscribe(
      response => {
        this.postDetails = response;
        console.log(response.Postedetails)
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

  loadComments(postId: string): void {
    this.isLoadingComments = true;
    this.postService.getCommentsByPostId(postId).subscribe(
      (response) => {
        this.comments = response;
        this.isLoadingComments = false;
      },
      (error) => {
        console.error('Error loading comments:', error);
        this.isLoadingComments = false;
      }
    );
  }

  loadObjectsForPost(postDetails: any[]): void {
    const itemRequests = postDetails.map((detail: any) =>
      firstValueFrom(this.postService.getItemById(detail.Objet.item_id))
    );
  
    console.log(itemRequests); // Affiche des promesses
  
    this.isLoading = true;
    Promise.all(itemRequests).then((responses: any[]) => {
      this.morecollection = responses;
      this.isLoading = false;
      console.log(this.morecollection); // Affiche les réponses des objets
    }).catch(error => {
      console.error('Erreur lors du chargement des objets:', error);
      this.isLoading = false;
    });
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

        L.marker([this.postDetails.latitude, this.postDetails.longitude]).addTo(this.map)
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
          const postId = this.route.snapshot.paramMap.get('id');
          if (postId) {
          this.loadComments(postId); 
          }
        },
        error => {
          console.error('Erreur lors de l\'ajout du commentaire:', error);
        }
      );
    }
  }
  deleteComment(commentId: string, auteurId: string): void {
    // Vérifier si l'utilisateur est l'auteur du post ou du commentaire
    if (this.currentUser.id !== this.postDetails.user_id && this.currentUser.id !== auteurId) {
        console.error('Vous n\'avez pas l\'autorisation de supprimer ce commentaire');
        return;
    }

    this.isLoadingComments = true; // Démarrer l'indicateur de chargement
    this.postService.deleteComment(commentId).subscribe(
        () => {
            console.log('Commentaire supprimé avec succès');
            this.comments = this.comments.filter(comment => comment._id !== commentId);
            this.isLoadingComments = false; // Arrêter l'indicateur de chargement
        },
        error => {
            console.error('Erreur lors de la suppression du commentaire:', error);
            this.isLoadingComments = false; // Arrêter l'indicateur de chargement en cas d'erreur
        }
    );
}
  

}
