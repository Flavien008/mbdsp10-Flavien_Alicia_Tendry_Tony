import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications/user`;

  constructor(private http: HttpClient) { }

  getNotifications(userId: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching notifications:', error);
        return throwError(error);
      })
    );
  }

  updateNotificationReadStatus(notificationId: string, readStatus: boolean): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(
      `${environment.apiUrl}/notifications/${notificationId}`,
      { read: readStatus },
      { headers }
    ).pipe(
      catchError((error) => {
        console.error('Error updating notification:', error);
        return throwError(error);
      })
    );
  }

  deleteNotification(notificationId: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${environment.apiUrl}/notifications/${notificationId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error deleting notification:', error);
        return throwError(error);
      })
    );
  }
}
