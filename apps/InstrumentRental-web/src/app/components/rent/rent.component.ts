import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '../../entity/instrument/instrument.model';
import { InstrumentService } from '../../entity/instrument/instrument.service';
import { RouterLink } from '@angular/router';
import { RentListComponent } from './list/rent.list.component';
import { RentFiltersComponent } from './filters/rent.filters.component';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule, RouterLink, RentListComponent, RentFiltersComponent],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css',
})
export class RentComponent implements OnInit {
  instruments: Instrument[] = [];

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit(): void {
    this.instruments = this.instrumentService.getInstruments();
  }
}
