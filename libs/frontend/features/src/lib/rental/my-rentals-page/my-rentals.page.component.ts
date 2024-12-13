import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { IRental, RentalStatus } from '@InstrumentRental/shared/api';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-my-rentals-page',
  templateUrl: './my-rentals.page.component.html',
})
export class MyRentalsPageComponent implements OnInit {
  rentals: IRental[] = [];
  currentDate: Date = new Date();

  constructor(
    private rentalService: RentalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const email = decodedToken.email;

    this.rentalService
      .getByStatusAndOwnerEmail(RentalStatus.inProgress, email)
      .subscribe(
        (rentals: IRental[]) => {
          this.rentals = rentals
            .map(rental => ({
              ...rental,
              startDate: new Date(rental.startDate),
              endDate: new Date(rental.endDate)
            }))
            .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
          console.log('rentalsss', rentals[0].instrument?.name);
        },
        (error) => {
          console.error('Error fetching rentals:', error);
        }
      );
  } else {
    console.error('No JWT token found in local storage');
  }
}

  goToDetailPage(rental: any): void {
    this.router.navigate(['/rental', rental._id], { state: { rental } });
  }
}
