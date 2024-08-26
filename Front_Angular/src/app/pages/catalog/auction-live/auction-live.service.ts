import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `${environment.apiUrl}/objets`;

  constructor(private http: HttpClient) { }

  getItemById(id:string): Observable<any> {
    const token = sessionStorage.getItem('authToken'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching item:', error);
        return throwError(error);
      })
    );
  }
  deleteItem(id: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error deleting item:', error);
        return throwError(error);
      })
    );
  }
}
