import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  createOffer(offerData: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl+'/echanges', offerData, { headers });
  }

  getOffersByPostId(postId: any): Observable<any[]> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/echanges/post/${postId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching offers:', error);
        return throwError(error);
      })
    );
  }

  getPostById(postId: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/postes/${postId}`, { headers });
  }

  updateOfferStatus(offerId: string, status: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/echanges/${offerId}`, { status }, { headers });
}
}
