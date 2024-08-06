import { Component, OnInit } from '@angular/core';
import { notification } from './data'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  masterSelected!: boolean;
  allnotification: any;

  constructor() { }

  ngOnInit(): void {
    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header account and wallet button
    document.querySelector('.account')?.classList.add('d-none');
    document.querySelector('.wallet')?.classList.add('d-none');
    document.querySelector('.connectwallet')?.classList.add('d-none');

    // Remove mail subscription footer
    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10');
    document.querySelector('.footer.bg-secondary')?.classList.add('d-none');

    // Fetch Data
    this.allnotification = notification.map((notif: any) => ({
      ...notif,
      read: notif.state // Map state to read
    }));
  }

  // Mark notification as read
  markAsRead(notif: any) {
    notif.read = true;
  }

  // Track by function for ngFor
  trackById(index: number, item: any): number {
    return item.id;
  }

  // Save changes
  saveChanges() {
    console.log("Changes saved");
    // Implement your save logic here
  }
}
