// libs/frontend/features/src/lib/rental/rental-pending-list/rental-pending.list.component.ts
import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { InstrumentService } from '../../instrument/instrument.service';
import { IRental, IInstrument, RentalStatus, IUpdateRental } from '@InstrumentRental/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'lib-rental-pending-list',
  templateUrl: './rental-pending.list.component.html',
  providers: [DatePipe]
})
export class RentalPendingListComponent implements OnInit {
  pendingRentals: (IRental & { instrument?: IInstrument })[] = [];

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

    this.rentalService.getAll().subscribe((rentals) => {
      const filteredRentals = rentals.filter(
        rental => rental.instrumentOwnerEmail === userEmail
      );

      const rentalObservables = filteredRentals.map((rental) =>
        this.instrumentService.read(rental.instrumentId).pipe(
          map(({ instrument }) => ({ ...rental, instrument }))
        )
      );

      forkJoin(rentalObservables).subscribe((rentalsWithInstruments) => {
        this.pendingRentals = rentalsWithInstruments;
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
      });
    });
  }
}
