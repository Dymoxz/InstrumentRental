import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '../../../entity/instrument/instrument.model';
import { InstrumentService } from '../../../entity/instrument/instrument.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rent-filters',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rent.filters.component.html',
  styleUrl: './rent.filters.component.css',
})
export class RentFiltersComponent implements OnInit {
  instruments: Instrument[] = [];

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit(): void {
    this.instruments = this.instrumentService.getInstruments();
  }
}
