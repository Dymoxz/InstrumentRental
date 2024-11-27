import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstrumentService } from '../instrument.service';
import { IInstrument } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-instrument-filters',
  templateUrl: './instrument.filters.component.html',
})
export class InstrumentFiltersComponent implements OnInit, OnDestroy {
  instruments: IInstrument[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit(): void {
    this.subscription = this.instrumentService
      .list()
      .subscribe((results: IInstrument[] | null) => {
        console.log(`results: ${results}`);
        this.instruments = results;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
