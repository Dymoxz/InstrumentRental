import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instrument } from './instrument.model';
import { InstrumentService } from './instrument.service';

@Component({
  selector: 'app-instrument',
  standalone: true,
  templateUrl: './instrument.component.html',
})
export class InstrumentComponent implements OnInit {
  instrumentId: string | null = null;
  instrument: Instrument | null = null;

  constructor(
    private route: ActivatedRoute,
    private instrumentService: InstrumentService
  ) {}

  ngOnInit(): void {
    // Deze manier is statisch: bij navigatie krijgen we niet de nieuwe id uit de URL.
    // this.userId = this.route.snapshot.paramMap.get('id');

    // Deze manier maakt gebruik van RxJs Observables.
    // We komen hier bij services en HTTP op terug.
    this.route.paramMap.subscribe((params) => {
      this.instrumentId = params.get('id');
      this.instrument = this.instrumentService.getInstrumentById(Number(this.instrumentId)); // Waarom 'Number'?
    });
  }
}
