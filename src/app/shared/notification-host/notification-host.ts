import { Component, inject } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  imports: [],
  selector: 'app-notification-host',
  styleUrl: './notification-host.css',
  templateUrl: './notification-host.html',
})
export class NotificationHost {
  protected readonly notificationService = inject(NotificationService);
}
