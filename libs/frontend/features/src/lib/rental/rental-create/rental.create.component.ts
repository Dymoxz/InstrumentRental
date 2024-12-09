import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../rental.service';
import { InstrumentService } from '../../instrument/instrument.service';
import { IRental, ICreateRental, RentalStatus } from '@InstrumentRental/shared/api';
import { jwtDecode } from 'jwt-decode';

declare let Datepicker: any;

@Component({
  selector: 'lib-rental-create',
  templateUrl: './rental.create.component.html',
})
export class RentalCreateComponent implements OnInit, AfterViewInit {
  startDate = '';
  endDate = '';
  reason = '';
  instrumentId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private instrumentService: InstrumentService
  ) {}

  ngOnInit(): void {
    // Fetch instrument ID from the parent route params
    this.route.parent?.paramMap.subscribe((params) => {
      this.instrumentId = params.get('id');
      if (!this.instrumentId) {
        console.error('Instrument ID is missing');
      }
    });
  }

  ngAfterViewInit(): void {
    const startDateInput = document.getElementById('datepicker-range-start') as HTMLInputElement;
    const endDateInput = document.getElementById('datepicker-range-end') as HTMLInputElement;

    // Initialize Datepicker for start and end date
    if (startDateInput && endDateInput) {
      const startDatepicker = new Datepicker(startDateInput, {
        format: 'yyyy-mm-dd',
        autohide: true,
      });
      const endDatepicker = new Datepicker(endDateInput, {
        format: 'yyyy-mm-dd',
        autohide: true,
      });

      // Listen for changes and update component properties
      startDateInput.addEventListener('changeDate', (event: any) => {
        this.startDate = event.target.value || '';
        console.log('Start date selected:', this.startDate);
      });

      endDateInput.addEventListener('changeDate', (event: any) => {
        this.endDate = event.target.value || '';
        console.log('End date selected:', this.endDate);
      });
    }
  }


  logDate(type: string, date: string): void {
    console.log(`${type} date selected:`, date);
  }

  closeModal(): void {
    this.router.navigate([{ outlets: { modal: null } }], {
      relativeTo: this.route.parent,
    });
  }

  requestRental(): void {
    if (!this.instrumentId) {
      console.error('Instrument ID is missing');
      return;
    }

    // Ensure both start and end dates are selected
    if (!this.startDate || !this.endDate) {
      console.error('Both start and end dates are required');
      return;
    }

    this.instrumentService.read(this.instrumentId).subscribe(
      ({ instrument }) => {
        const token = localStorage.getItem('token');
        let renterEmail = '';
        if (token) {
          const decodedToken: any = jwtDecode(token);
          renterEmail = decodedToken.email;
        }

        const rentalData: ICreateRental = {
          startDate: new Date(this.startDate),
          endDate: new Date(this.endDate),
          totalPrice: 0, // Calculate total price based on your logic
          reason: this.reason,
          status: RentalStatus.pendingApproval,
          instrumentId: instrument._id,
          instrumentOwnerEmail: instrument.ownerEmail,
          renterEmail: renterEmail,
        };

        this.rentalService.create(rentalData).subscribe(
          (rental: IRental) => {
            console.log('Rental created:', rental);
            this.closeModal();
          },
          (error) => {
            console.error('Error creating rental:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching instrument:', error);
      }
    );
  }
}
