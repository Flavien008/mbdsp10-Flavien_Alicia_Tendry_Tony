import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemCreateService {
  private apiUrl = `${environment.apiUrl}/objets`;

  constructor(private http: HttpClient) { }

  createItem(data: any): Observable<any> {
    const token = sessionStorage.getItem('authToken'); 

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.post<any>(this.apiUrl, JSON.stringify(data), { headers }).pipe(
      catchError((error) => {
        console.error('Error creating item:', error);
        return throwError(error);
      })
    );
  }
}
