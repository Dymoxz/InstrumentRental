import { Component, OnDestroy, OnInit } from '@angular/core';
import { IInstrument } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { InstrumentService } from '../instrument.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-instrument-detail',
  templateUrl: './instrument.detail.component.html',
})


export class InstrumentDetailComponent implements OnInit, OnDestroy {
  instrument: IInstrument | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private instrumentService: InstrumentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const instrumentId = this.route.snapshot.paramMap.get('id');
    this.subscription = this.instrumentService
      .read(instrumentId)
      .subscribe((result: IInstrument | null) => {
        console.log(`result: ${result?.name}`);
        this.instrument = result;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
