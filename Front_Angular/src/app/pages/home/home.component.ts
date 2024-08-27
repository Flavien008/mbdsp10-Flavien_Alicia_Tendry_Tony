import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public isCollapsed = true;
  breadCrumbItems!: Array<{}>;
  allproduct: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';  
  isLoading: boolean = true;
  searchTerm: string = '';  
  sortByDate: string = 'DESC'; 
  page: number = 1;         
  pageSize: number = 10;    
  total: number = 0;        
  isAuthenticated: boolean = false;  // Pour vérifier si l'utilisateur est connecté

  constructor(public service: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication(); 
    console.log(this.isAuthenticated) // Vérifiez si l'utilisateur est authentifié

    if (this.isAuthenticated) {
      console.log("ato")
      this.fetchCategories();
      this.fetchPosts();
    }else this.isLoading = false;

    document.documentElement.scrollTop = 0;

    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Marketplace', link: '/' },
      { label: 'All Posts', active: true, link: 'All Posts' }
    ];
  }

  checkAuthentication(): void {
    const token = sessionStorage.getItem('authToken');
    this.isAuthenticated = !!token;  // Si le token existe, l'utilisateur est authentifié
  }

  fetchCategories(): void {
    this.service.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchPosts(): void {
    this.isLoading = true;
    this.service.getAllPosts(this.page, this.pageSize, this.searchTerm, this.selectedCategory, this.sortByDate).subscribe(
      (response) => {
        this.allproduct = response.data.map((post: any) => {
          post.collageImages = this.getCollageImages(post.Postedetails);
          return post;
        });
        this.total = response.total;  
        this.pageSize = response.totalPages ? Math.ceil(this.total / response.totalPages) : this.pageSize;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching posts:', error);
        this.isLoading = false;
      }
    );
  }

  getCollageImages(postDetails: any[]): any[] {
    const images: any[] = [];
    
    for (const detail of postDetails) {
        if (detail.Objet && detail.Objet.images) {
            images.push(...detail.Objet.images.slice(0, 3 - images.length));
        }
        if (images.length >= 3) {
            break; 
        }
    }

    return images;
  }

  trackByFn(index: number, item: any): any {
    return item.poste_id;
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.fetchPosts();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.page = 1;  
    this.fetchPosts();
  }

  onSearchTermChange(): void {
    this.page = 1;
    this.fetchPosts();
  }

  onSortChange(event: any): void {
    this.sortByDate = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }
}
