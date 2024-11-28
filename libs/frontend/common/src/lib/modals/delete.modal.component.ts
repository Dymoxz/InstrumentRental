import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-delete-modal',
  templateUrl: './delete.modal.component.html',
})
export class DeleteModalComponent {
  @Output() deleteConfirmed = new EventEmitter<void>();
  isVisible = false;

  confirmDelete(): void {
    this.deleteConfirmed.emit();
    this.close();
  }

  cancelDelete(): void {
    this.close();
  }

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }
}
