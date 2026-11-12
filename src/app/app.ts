import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { NotificationHost } from './shared/notification-host/notification-host';

@Component({
  imports: [RouterOutlet, Header, NotificationHost],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('FormsAndHTTP');
}
