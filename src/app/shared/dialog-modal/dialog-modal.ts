import { afterNextRender, Component, ElementRef, output, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-dialog-modal',
  styleUrl: './dialog-modal.css',
  templateUrl: './dialog-modal.html',
})
export class DialogModal {
  readonly closed = output();
  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialogRef');

  constructor() {
    afterNextRender(() => {
      this.dialogRef().nativeElement.showModal();
    });
  }
}
