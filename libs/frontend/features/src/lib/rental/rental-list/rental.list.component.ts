import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { IRental } from '@InstrumentRental/shared/api';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-rental-list',
  templateUrl: './rental.list.component.html',
})
export class RentalListComponent implements OnInit {
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

      this.rentalService.getByRenterEmail(email).subscribe(
        (rentals: IRental[]) => {
          this.rentals = rentals
            .map(rental => ({
              ...rental,
              startDate: new Date(rental.startDate),
              endDate: new Date(rental.endDate)
            }))
            .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
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
