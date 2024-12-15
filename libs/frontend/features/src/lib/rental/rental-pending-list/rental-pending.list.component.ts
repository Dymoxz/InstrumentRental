import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { IRental, RentalStatus, IUpdateRental } from '@InstrumentRental/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'lib-rental-pending-list',
  templateUrl: './rental-pending.list.component.html',
  providers: [DatePipe]
})
export class RentalPendingListComponent implements OnInit {
  pendingRentals: IRental[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private datePipe: DatePipe
  ) {}

  closeModal(): void {
    this.router.navigate([{ outlets: { inboxModal: null } }], {
      relativeTo: this.route.parent,
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    let userEmail = '';
    if (token) {
      const decodedToken: any = jwtDecode(token);
      userEmail = decodedToken.email;
    }

    this.rentalService.getByStatusAndOwnerEmail(RentalStatus.pendingApproval, userEmail).pipe(
      catchError(() => {
        this.isLoading = false;
        return of([]);
      })
    ).subscribe((rentals) => {
      this.pendingRentals = rentals;
      this.isLoading = false;
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'MMM d, y') || '';
  }

  acceptRental(rental: IRental): void {
    const updatedRental: IUpdateRental = { status: RentalStatus.inProgress };
    this.rentalService.update(rental._id, updatedRental).subscribe(() => {
      if (rental.instrument) {
        rental.instrument.available = false;
      }
      rental.status = RentalStatus.inProgress;
      this.removeRentalFromList(rental._id);
    });
  }

  rejectRental(rental: IRental): void {
    const updatedRental: IUpdateRental = { status: RentalStatus.rejected };
    this.rentalService.update(rental._id, updatedRental).subscribe(() => {
      rental.status = RentalStatus.rejected;
      this.removeRentalFromList(rental._id);
    });
  }

  private removeRentalFromList(rentalId: string): void {
    this.pendingRentals = this.pendingRentals.filter(rental => rental._id !== rentalId);
  }
}
