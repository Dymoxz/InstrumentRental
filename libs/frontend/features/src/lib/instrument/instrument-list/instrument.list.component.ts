import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstrumentService } from '../instrument.service';
import { IInstrument, IUser } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { SearchService } from '../search.service';
import { forkJoin } from 'rxjs'; // Import forkJoin to combine multiple observables

@Component({
  selector: 'lib-instrument-list',
  templateUrl: './instrument.list.component.html'
})
export class InstrumentListComponent implements OnInit, OnDestroy {
  instruments: (IInstrument & { owner: IUser | null })[] | null = null; // Update this line
  filteredInstruments: (IInstrument & { owner: IUser | null })[] | null = null; // Update this line
  recommendedInstruments: IInstrument[] | null = null;
  subscription: Subscription | undefined = undefined;
  searchSubscription: Subscription | undefined; // Subscription for searchTerm$
  isLoading = true;

  constructor(private instrumentService: InstrumentService, private searchService: SearchService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    let email = '';
    if (token) {
      const decodedToken: any = jwtDecode(token);
      email = decodedToken.email;
    }

    this.subscription = this.instrumentService.list().subscribe((results: (IInstrument & { owner: IUser | null })[] | null) => { // Update this line
      this.isLoading = false; // Set isLoading to false after data is fetched
      this.instruments = results;
      this.filterInstruments(); // Initial filter
    });
    // Step 1: First, get recommended instruments
    this.subscription.add(
      this.instrumentService.getRecommended(email).subscribe(
        (recommendedInstruments) => {
          console.log('[Instruments List] Recommended instruments fetched:', recommendedInstruments);
          this.recommendedInstruments = recommendedInstruments;

          // Step 2: After fetching recommended instruments, get all instruments
          this.subscription?.add(
            this.instrumentService.list().subscribe(
              (instruments) => {
                this.isLoading = false;
                console.log('[Instruments List] All instruments fetched:', instruments);

                if (!instruments) {
                  console.error('[Instruments List] Instruments not loaded');
                  return;
                }

                // Step 3: Mark instruments as recommended if their ID matches
                const recommendedIds = new Set(
                  recommendedInstruments.map((instrument) => String(instrument._id)) // Ensure the _id is a string
                );

                // Log the IDs being compared
                console.log('[Instruments List] Recommended instrument IDs:', recommendedIds);

                this.instruments = instruments.map((instrument) => {
                  const isRecommended = recommendedIds.has(String(instrument._id));
                  console.log('[Instruments List] Instrument ID:', instrument._id, 'isRecommended:', isRecommended);

                  return {
                    ...instrument,
                    isRecommended, // Set isRecommended flag
                  };
                });

                // Step 4: Sort the instruments to ensure recommended ones come first
                this.instruments.sort((a, b) => {
                  if (a.isRecommended === b.isRecommended) {
                    return 0;
                  }
                  return a.isRecommended ? -1 : 1;
                });

                console.log('[Instruments List] Sorted instruments:', this.instruments);

                this.filterInstruments(); // Filter after all data is ready
              },
              (error) => {
                console.error('[Instruments List] Error fetching all instruments:', error);
                this.isLoading = false;
              }
            )
          );
        },
        (error) => {
          console.error('[Instruments List] Error fetching recommended instruments:', error);
          this.isLoading = false;
        }
      )
    );

    // Subscribe to search term changes
    this.searchSubscription = this.searchService.searchTerm$.subscribe(() => {
      this.filterInstruments();
    });
  }

  filterInstruments() {
    if (!this.instruments) {
      console.error('[Instruments List] Cannot filter instruments: Data not loaded yet.');
      return;
    }

    this.searchService.searchTerm$.subscribe(searchTerm => {
      const searchTermLower = searchTerm.toLowerCase();
      const token = localStorage.getItem('token');
      let email = '';
      if (token) {
        const decodedToken: any = jwtDecode(token);
        email = decodedToken.email;
      }

      this.filteredInstruments = this.instruments!.filter(instrument => {
        return instrument.ownerEmail !== email && (
          instrument.name.toLowerCase().includes(searchTermLower) ||
          instrument.type!.toLowerCase().includes(searchTermLower)
        );
      });

      console.log('[Instruments List] Filtered instruments:', this.filteredInstruments);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
  }
}
