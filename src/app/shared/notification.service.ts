import { Service, signal } from '@angular/core';

@Service()
export class NotificationService {
  private readonly currentNotificationState = signal<string | null>(null);
  readonly current = this.currentNotificationState.asReadonly();
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  show(message: string) {
    clearTimeout(this.timeoutId);
    this.currentNotificationState.set(message);
    this.timeoutId = setTimeout(() => this.dismiss(), 4000);
  }

  dismiss() {
    clearTimeout(this.timeoutId);
    this.timeoutId = undefined;
    this.currentNotificationState.set(null);
  }
}
