import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DeleteModalComponent } from './modals/delete.modal.component';
import { RouterLink } from '@angular/router';
import { SuccessToastComponent } from './toasts/succes/success.toast.component';
import { DangerToastComponent } from './toasts/danger/danger.toast.component';
import { WarningToastComponent } from './toasts/warning/warning.toast.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink],
  declarations: [
    DeleteModalComponent,
    SuccessToastComponent,
    DangerToastComponent,
    WarningToastComponent,
  ],
  providers: [],
  exports: [DeleteModalComponent, DangerToastComponent],
})
export class FrontendCommonModule {}
