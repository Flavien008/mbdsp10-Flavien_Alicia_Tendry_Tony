import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `${environment.apiUrl}/objets/users`;

  constructor(private http: HttpClient) { }

  getItems(page: number, limit: number): Observable<any> {
    const token = sessionStorage.getItem('authToken'); 
    const currentUser = sessionStorage.getItem('currentUser'); 

    let userId: number | null = null;
    if (currentUser) {
      const user = JSON.parse(currentUser); 
      userId = user.id; 
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/${userId}?page=${page}&limit=${limit}`, { headers });
  }
}
