import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/users/login`;
    return this.http.post<any>(url, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          sessionStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  logout() {
    sessionStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('authToken') !== null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
}
