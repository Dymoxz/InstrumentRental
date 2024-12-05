import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstrumentService } from '../instrument.service';
import { IInstrument } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
  selector: 'lib-instrument-filters',
  templateUrl: './instrument.filters.component.html',
})
export class InstrumentFiltersComponent implements OnInit, OnDestroy {
  searchTerm = ''; // Add the searchTerm property
  instruments: IInstrument[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private instrumentService: InstrumentService,
    private searchService: SearchService
  ) {}


  search(term: string) {
    console.log('termmm', term)
    this.searchService.setSearchTerm(term);
  }

  ngOnInit(): void {
    this.subscription = this.instrumentService
      .list()
      .subscribe((results: IInstrument[] | null) => {
        console.log(`results: ${results}`);
        this.instruments = results;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
