import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-rental-detail',
  templateUrl: './rental.detail.component.html',
})
export class RentalDetailComponent implements OnInit {
  rental: any;

  ngOnInit(): void {
    // Retrieve the passed rental object
    this.rental = history.state.rental;

    console.log('Rental details:', this.rental);
  }

}
