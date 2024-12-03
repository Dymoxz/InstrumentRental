import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '../instrument.service';
import { IInstrument, InstrumentType } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';

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
    return {
      _id: '',
      name: '',
      type: undefined,
      brand: '',
      model: '',
      description: '',
      pricePerDay: 0,
      available: true,
      ownerEmail: 'jane.smith@example.com'
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
