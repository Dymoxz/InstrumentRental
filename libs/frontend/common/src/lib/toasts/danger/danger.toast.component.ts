import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-danger-toast',
  templateUrl: './danger.toast.component.html',
  styleUrls: ['./danger.toast.component.css']
})
export class DangerToastComponent {
  @Input() toastText =  '';
  isVisible = false;

  showToast() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}
