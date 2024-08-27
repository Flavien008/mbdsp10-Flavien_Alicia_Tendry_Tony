import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Assurez-vous que le chemin est correct pour votre environnement

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  createPost(postData: any): Observable<any> {
    const currentUser = sessionStorage.getItem('currentUser'); 

    let userId: number | null = null;
    if (currentUser) {
      const user = JSON.parse(currentUser); 
      userId = user.id; 
    }
    postData.user_id= userId;
    const token = sessionStorage.getItem('authToken'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(postData);
    return this.http.post<any>(this.apiUrl+"/postes", postData, { headers });
    // console.log(postData);
  }

  getItems(page: number, limit: number): Observable<any> {
    const token = sessionStorage.getItem('authToken'); 
    const currentUser = sessionStorage.getItem('currentUser'); 

    let userId: number | null = null;
    if (currentUser) {
      const user = JSON.parse(currentUser); 
      userId = user.id; 
    }

    if (!userId) {
        throw new Error("User ID not found in session storage");
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.apiUrl}/objets/users/${userId}`, { headers, params })
      .pipe(
        catchError((error) => {
          console.error('Error fetching items:', error);
          return throwError(error);
        })
      );
}

}
