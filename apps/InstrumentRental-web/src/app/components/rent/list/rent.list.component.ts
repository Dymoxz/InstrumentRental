import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '../../../entity/instrument/instrument.model';
import { InstrumentService } from '../../../entity/instrument/instrument.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rent-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rent.list.component.html',
  styleUrl: './rent.list.component.css',
})
export class RentListComponent implements OnInit {
  instruments: Instrument[] = [];

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit(): void {
    this.instruments = this.instrumentService.getInstruments();
  }
}
