import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/postes`;

  constructor(private http: HttpClient) { }

  getUserPosts(username: string, page: number, limit: number): Observable<any> {
    const token = sessionStorage.getItem('authToken'); 

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    const params = {
      page: page.toString(),
      limit: limit.toString(),
      nomUtilisateur: username
    };

    console.log(params);
    return this.http.get<any>(this.apiUrl, { headers, params }).pipe(
      catchError((error) => {
        console.error('Error fetching user posts:', error);
        return throwError(error);
      })
    );
  }

  deletePost(posteId: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${posteId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error deleting post:', error);
          return throwError(error);
        })
      );
  }
  
}
