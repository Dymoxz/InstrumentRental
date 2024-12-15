import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentalService } from '../rental.service';
import { RentalStatus } from '@InstrumentRental/shared/api';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'lib-rental-detail',
  templateUrl: './rental.detail.component.html',
})
export class RentalDetailComponent implements OnInit {
  rental: any;
  isUserRenter = false;
  currentDate: Date = new Date();

  constructor(
    private rentalService: RentalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rental = history.state.rental;
    this.checkIfUserIsRenter();
  }

  checkIfUserIsRenter(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const email = decodedToken.email;

      if (this.rental.renter?.email === email) {
        this.isUserRenter = true;
      }
    } else {
      console.error('No JWT token found in local storage');
    }
  }

  completeRental(): void {
    this.updateRentalStatus(RentalStatus.completed);
    this.router.navigate(['/my-rentals']);
  }

  cancelRental(): void {
    this.updateRentalStatus(RentalStatus.cancelled);
    this.router.navigate(['/my-rentals']);

  }

  private updateRentalStatus(status: RentalStatus): void {
    this.rentalService.update(this.rental._id, { status }).subscribe(
      (updatedRental) => {
        this.rental.status = updatedRental.status;
        this.router.navigate(['/my-rentals']);
      },
      (error) => {
        console.error('Error updating rental status:', error);
      }
    );
  }

  protected readonly RentalStatus = RentalStatus;
}
