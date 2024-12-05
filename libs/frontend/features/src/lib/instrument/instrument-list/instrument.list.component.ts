import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstrumentService } from '../instrument.service';
import { IInstrument } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'lib-instrument-list',
  templateUrl: './instrument.list.component.html',
})
export class InstrumentListComponent implements OnInit, OnDestroy {
  instruments: IInstrument[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    let email = '';
    if (token) {
      const decodedToken: any = jwtDecode(token);
      email = decodedToken.email;
    }

    this.subscription = this.instrumentService
      .list()
      .subscribe((results: IInstrument[] | null) => {
        console.log(`results: ${results}`);
        this.instruments = results?.filter(instrument => instrument.ownerEmail !== email) || null;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
