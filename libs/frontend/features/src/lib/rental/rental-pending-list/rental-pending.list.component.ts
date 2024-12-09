// libs/frontend/features/src/lib/rental/rental-pending-list/rental-pending.list.component.ts
import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { InstrumentService } from '../../instrument/instrument.service';
import { IRental, IInstrument } from '@InstrumentRental/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

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
    this.rentalService.getAll().subscribe((rentals) => {
      const rentalObservables = rentals.map((rental) =>
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
}
