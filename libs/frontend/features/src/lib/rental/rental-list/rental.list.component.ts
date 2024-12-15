import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { IRental, RentalStatus } from '@InstrumentRental/shared/api';
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
        const currentDate = new Date();
        this.rentals = rentals
          .filter(rental => rental.status !== RentalStatus.rejected)
          .map(rental => ({
            ...rental,
            startDate: new Date(rental.startDate),
            endDate: new Date(rental.endDate)
          }))
          .sort((a, b) => {
  const isInProgressA = a.status === RentalStatus.inProgress;
  const isInProgressB = b.status === RentalStatus.inProgress;
  const isCurrentA = isInProgressA && currentDate >= a.startDate && currentDate <= a.endDate;
  const isCurrentB = isInProgressB && currentDate >= b.startDate && currentDate <= b.endDate;

  if (isCurrentA && !isCurrentB) return -1;
  if (!isCurrentA && isCurrentB) return 1;
  if (isInProgressA && !isInProgressB) return -1;
  if (!isInProgressA && isInProgressB) return 1;
  if (isInProgressA && isInProgressB) return a.startDate.getTime() - b.startDate.getTime();
  if (a.status === RentalStatus.pendingApproval && b.status !== RentalStatus.pendingApproval) return -1;
  if (a.status !== RentalStatus.pendingApproval && b.status === RentalStatus.pendingApproval) return 1;
  if (a.status === RentalStatus.rejected && b.status !== RentalStatus.rejected) return -1;
  if (a.status !== RentalStatus.rejected && b.status === RentalStatus.rejected) return 1;
  if (a.status === RentalStatus.completed && b.status !== RentalStatus.completed) return -1;
  if (a.status !== RentalStatus.completed && b.status === RentalStatus.completed) return 1;
  if (a.status === RentalStatus.cancelled && b.status !== RentalStatus.cancelled) return 1;
  if (a.status !== RentalStatus.cancelled && b.status === RentalStatus.cancelled) return -1;
  return 0;
});
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

  protected readonly RentalStatus = RentalStatus;
}
