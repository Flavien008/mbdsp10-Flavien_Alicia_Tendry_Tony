import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemUpdateService {
  private apiUrl = `${environment.apiUrl}/objets`;

  constructor(private http: HttpClient) { }

  updateItem(id: string, data: any): Observable<any> {
    const token = sessionStorage.getItem('authToken'); 

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.put<any>(`${this.apiUrl}/${id}`, JSON.stringify(data), { headers }).pipe(
      catchError((error) => {
        console.error('Error updating item:', error);
        return throwError(error);
      })
    );
  }
}
