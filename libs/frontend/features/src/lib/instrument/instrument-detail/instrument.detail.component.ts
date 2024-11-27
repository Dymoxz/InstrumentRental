import { Component, OnDestroy, OnInit } from '@angular/core';
import { IInstrument } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { InstrumentService } from '../instrument.service';

@Component({
  selector: 'lib-instrument-detail',
  templateUrl: './instrument.detail.component.html',
})


export class InstrumentDetailComponent implements OnInit, OnDestroy {
  instrument: IInstrument | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit(): void {
    this.subscription = this.instrumentService
      .read('0')
      .subscribe((result: IInstrument | null) => {
        console.log(`result: ${result}`);
        this.instrument = result;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
