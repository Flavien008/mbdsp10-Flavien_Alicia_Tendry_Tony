import { Component, OnInit } from '@angular/core';
import { OfferService } from '../make-offer/offer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers: any[] = [];
  postDetails: any;
  isLoading = true;
  postId!: number;

  constructor(private offerService: OfferService,private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
     // L'identifiant du post pour lequel vous voulez charger les offres
   
    console.log("atooo")
    console.log(this.postDetails)
    console.log(this.offers);
    this.postId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.loadOffers(this.postId); 
    this.loadPostDetails(this.postId);


  }

  loadOffers(postId: any): void {
    this.offerService.getOffersByPostId(postId).subscribe(
      (response) => {
        this.offers = response;
        this.isLoading = false;
        console.log(this.offers)
      },
      (error) => {
        console.error('Error fetching offers:', error);
        this.isLoading = false;
      }
    );
  }

  loadPostDetails(postId: any): void {
    this.isLoading = true;
    this.offerService.getPostById(postId).subscribe(
      response => {
        this.postDetails = response;
        this.isLoading = false;
        console.log(this.postDetails)
      },
      error => {
        console.error('Erreur lors du chargement des détails de la publication:', error);
        this.isLoading = false;
      }
    );
  }

  updateOfferStatus(offerId: string, status: string): void {
    this.offerService.updateOfferStatus(offerId, status).subscribe(
      response => {
        console.log(`Offre ${status} avec succès`);
        this.loadOffers(this.postDetails.id); 
      },
      error => {
        console.error(`Erreur lors de la mise à jour de l'offre:`, error);
      }
    );
  }
}
