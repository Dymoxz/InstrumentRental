import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-rental-create',
  templateUrl: './rental.create.component.html',
})
export class RentalCreateComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  closeModal(): void {
    this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.route.parent });
  }
}
