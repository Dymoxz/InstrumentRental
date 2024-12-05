import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '../instrument.service';
import { IInstrument, InstrumentType } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'lib-instrument-edit-page',
  templateUrl: './instrument-edit.page.component.html'
})
export class InstrumentEditPageComponent implements OnInit, OnDestroy {
  instrument: IInstrument | null = null;
  subscription: Subscription | undefined = undefined;
  instrumentTypes: InstrumentType[] = Object.values(InstrumentType);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instrumentService: InstrumentService
  ) {}

  ngOnInit(): void {
    const instrumentId = this.route.snapshot.paramMap.get('id');
    if (instrumentId) {
      this.subscription = this.instrumentService
        .read(instrumentId)
        .subscribe(({ instrument }) => {
          this.instrument = instrument;
        });
    } else {
      this.instrument = this.CreateEmptyInstrument();
    }
  }

  private CreateEmptyInstrument(): IInstrument {
    const token = localStorage.getItem('token');
    let email = '';
    if (token) {
      const decodedToken: any = jwtDecode(token);
      email = decodedToken.email;
    }
    return {
      _id: '',
      name: '',
      type: undefined,
      brand: '',
      model: '',
      description: '',
      pricePerDay: 0,
      available: true,
      ownerEmail: email
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  goBack(): void {
    window.history.back();
  }

  saveInstrument(): void {
    if (this.instrument) {
      if (this.instrument._id) {
        // Update existing instrument
        this.instrumentService.update(this.instrument._id, this.instrument).subscribe(() => {
          this.router.navigate(['/my-instruments']);
        });
      } else {
        // Create new instrument
        this.instrumentService.create(this.instrument).subscribe(() => {
          this.router.navigate(['/my-instruments']);
        });
      }
    }
  }
}
