import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPosts(page: number, limit: number, searchTerm: string, category?: string, sortByDate?: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`);
    let url = `${this.apiUrl}/postes?page=${page}&limit=${limit}&texte=${searchTerm}`;

    if (category) {
      url += `&categorieObjet=${category}`;
    }

    if (sortByDate) {
      url += `&sortByDate=${sortByDate}`;
    }

    return this.http.get<any>(url, { headers });
  }

  getCategories(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`);
    return this.http.get<any>(`${this.apiUrl}/categories`, { headers });
  }
}
