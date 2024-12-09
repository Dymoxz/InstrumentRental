import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { InstrumentService } from '../../instrument/instrument.service';
import { IRental, IInstrument, RentalStatus, IUpdateRental } from '@InstrumentRental/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { of } from 'rxjs';

@Component({
  selector: 'lib-rental-pending-list',
  templateUrl: './rental-pending.list.component.html',
  providers: [DatePipe]
})
export class RentalPendingListComponent implements OnInit {
  pendingRentals: (IRental & { instrument?: IInstrument })[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private instrumentService: InstrumentService,
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
      if (rentals.length === 0) {
        this.isLoading = false;
        return;
      }

      const rentalObservables = rentals.map((rental) =>
        this.instrumentService.read(rental.instrumentId).pipe(
          map(({ instrument }) => ({ ...rental, instrument })),
          catchError(() => of({ ...rental }))
        )
      );

      forkJoin(rentalObservables).subscribe((rentalsWithInstruments) => {
        this.pendingRentals = rentalsWithInstruments;
        this.isLoading = false;
      });
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'MMM d, y') || '';
  }

  acceptRental(rental: IRental & { instrument?: IInstrument }): void {
    const updatedRental: IUpdateRental = { status: RentalStatus.inProgress };
    this.rentalService.update(rental._id, updatedRental).subscribe(() => {
      this.instrumentService.update(rental.instrumentId, { available: false }).subscribe(() => {
        rental.status = RentalStatus.inProgress;
        if (rental.instrument) {
          rental.instrument.available = false;
        }
        this.removeRentalFromList(rental._id);
      });
    });
  }

  rejectRental(rental: IRental & { instrument?: IInstrument }): void {
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
