import { Component, OnInit } from '@angular/core';
import { PostService } from './my-collection.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit {
  myPosts: any[] = [];
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  hasNext: boolean = false;
  hasPrev: boolean = false;
  isLoading: boolean = false;
  username: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.username = currentUser.name;
    this.loadUserPosts(this.username);
    console.log(currentUser)
  }

  loadUserPosts(username: string) {
    this.isLoading = true; // Début du chargement

    this.postService.getUserPosts(username, this.page, this.limit).subscribe(
      response => {
        this.myPosts = response.data;
        this.totalPages = response.totalPages;
        this.hasNext = response.hasNext;
        this.hasPrev = response.hasPrev;
        this.isLoading = false; // Fin du chargement
      },
      error => {
        console.error('Failed to load posts', error);
        this.isLoading = false; // Fin du chargement même en cas d'erreur
      }
    );
  }

  goToNextPage() {
    if (this.hasNext) {
      this.page++;
      this.loadUserPosts(this.username);
    }
  }

  goToPrevPage() {
    if (this.hasPrev) {
      this.page--;
      this.loadUserPosts(this.username);
    }
  }

  removePost(poste_id: string) {
    this.isLoading = true; // Début du chargement avant la suppression

    this.postService.deletePost(poste_id).subscribe(
      () => {
        this.myPosts = this.myPosts.filter(post => post.poste_id !== poste_id);
        console.log('Publication supprimée avec succès');
        this.isLoading = false; // Fin du chargement après la suppression
      },
      error => {
        console.error('Erreur lors de la suppression de la publication:', error);
        this.isLoading = false; // Fin du chargement même en cas d'erreur
      }
    );
  }
}
