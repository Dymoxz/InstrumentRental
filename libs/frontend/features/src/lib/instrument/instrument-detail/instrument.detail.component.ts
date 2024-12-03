// libs/frontend/features/src/lib/instrument/instrument-detail/instrument.detail.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IInstrument, IUser } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { InstrumentService } from '../instrument.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-instrument-detail',
  templateUrl: './instrument.detail.component.html',
})
export class InstrumentDetailComponent implements OnInit, OnDestroy {
  instrument: IInstrument | null = null;
  user: IUser | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private instrumentService: InstrumentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const instrumentId = this.route.snapshot.paramMap.get('id');
    this.subscription = this.instrumentService
      .read(instrumentId)
      .subscribe(({ instrument, user }) => {
        this.instrument = instrument;
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
