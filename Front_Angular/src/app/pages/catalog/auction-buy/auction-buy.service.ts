import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/postes`;

  constructor(private http: HttpClient) { }

  getPostById(postId: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${postId}`, { headers });
  }

  getCommentsByPostId(postId: string): Observable<any[]> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${environment.apiUrl}/commentaires/poste/${postId}`, { headers });
  }

  createComment(comment: { description: string, auteur_id: string, poste_id: string }): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${environment.apiUrl}/commentaires`, comment, { headers });
  }

  deleteComment(commentId: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${environment.apiUrl}/commentaires/${commentId}`, { headers });
  }
}
