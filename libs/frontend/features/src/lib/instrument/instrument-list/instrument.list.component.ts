import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstrumentService } from '../instrument.service';
import { IInstrument } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { SearchService } from '../search.service'; // Import the service

@Component({
  selector: 'lib-instrument-list',
  templateUrl: './instrument.list.component.html'
})
export class InstrumentListComponent implements OnInit, OnDestroy {
  instruments: IInstrument[] | null = null;
  filteredInstruments: IInstrument[] | null = null;
  subscription: Subscription | undefined = undefined;
  searchSubscription: Subscription | undefined; // Subscription for searchTerm$

  constructor(private instrumentService: InstrumentService, private searchService: SearchService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    let email = '';
    if (token) {
      const decodedToken: any = jwtDecode(token);
      email = decodedToken.email;
    }

    this.subscription = this.instrumentService.list().subscribe((results: IInstrument[] | null) => {
      this.instruments = results;
      this.filterInstruments(); // Initial filter
    });

    this.searchSubscription = this.searchService.searchTerm$.subscribe(() => {
      this.filterInstruments(); // Filter on search term change
    });
  }

  filterInstruments() {
    this.searchService.searchTerm$.subscribe(searchTerm => {
      const searchTermLower = searchTerm.toLowerCase(); // Get the current term
      const token = localStorage.getItem('token');
      let email = '';
      if (token) {
        const decodedToken: any = jwtDecode(token);
        email = decodedToken.email;
      }
      this.filteredInstruments = this.instruments?.filter(instrument => {
        return instrument.ownerEmail !== email && (
          instrument.name.toLowerCase().includes(searchTermLower) ||
          instrument.type!.toLowerCase().includes(searchTermLower)
        );
      }) || null;
    });
  }


  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
  }
}
