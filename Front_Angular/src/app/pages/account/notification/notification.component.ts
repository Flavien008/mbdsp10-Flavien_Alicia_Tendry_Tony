import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  masterSelected!: boolean;
  allnotification: any[] = [];
  userId = '1'; // Assurez-vous d'utiliser le bon ID utilisateur
  isLoading = false; // Variable pour gérer le chargement

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;

    document.querySelector('.account')?.classList.add('d-none');
    document.querySelector('.wallet')?.classList.add('d-none');
    document.querySelector('.connectwallet')?.classList.add('d-none');

    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10');
    document.querySelector('.footer.bg-secondary')?.classList.add('d-none');

    this.fetchNotifications();
  }

  fetchNotifications() {
    this.notificationService.getNotifications(this.userId).subscribe(
      (notifications) => {
        this.allnotification = notifications.map((notif: any) => ({
          ...notif,
          read: notif.read 
        }));
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  }

  markAsRead(notif: any) {
    this.isLoading = true;
    this.notificationService.updateNotificationReadStatus(notif._id, true).subscribe(
      (response) => {
        notif.read = true;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error updating notification', error);
        this.isLoading = false;
      }
    );
  }

  deleteNotification(notif: any) {
    this.isLoading = true;
    this.notificationService.deleteNotification(notif._id).subscribe(
      (response) => {
        this.allnotification = this.allnotification.filter(n => n._id !== notif._id);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error deleting notification', error);
        this.isLoading = false;
      }
    );
  }

  trackById(index: number, item: any): string {
    return item._id;
  }

  saveChanges() {
    console.log("Changes saved");
  }
}
