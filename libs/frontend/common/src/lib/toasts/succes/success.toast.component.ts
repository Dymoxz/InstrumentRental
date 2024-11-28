import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-success-toast',
  templateUrl: './success.toast.component.html',
  styleUrls: ['./success.toast.component.css']
})
export class SuccessToastComponent {
  @Input() toastText =  '';
  isVisible = false;

  showToast() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}
