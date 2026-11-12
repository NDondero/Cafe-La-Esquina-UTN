import { Service, signal } from '@angular/core';

@Service()
export class ConfirmationService {
  private readonly confirmationRequestState = signal<string | null>(null);
  readonly confirmationRequest = this.confirmationRequestState.asReadonly();

  private resolveConfirmation: ((confirmed: boolean) => void) | null = null;

  requestConfirmation(message: string) {
    return new Promise<boolean>((resolve) => {
      this.resolveConfirmation = resolve;
      this.confirmationRequestState.set(message);
    });
  }

  onConfirmationClosed(confirm: boolean) {
    const resolve = this.resolveConfirmation;
    if (!resolve) return;

    this.resolveConfirmation = null;
    this.confirmationRequestState.set(null);
    resolve(confirm);
  }
}
