import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../rental.service';
import { InstrumentService } from '../../instrument/instrument.service';
import {
  ICreateRental,
  IRental,
  RentalStatus,
} from '@InstrumentRental/shared/api';
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
  const startDateInput = document.getElementById(
    'datepicker-range-start'
  ) as HTMLInputElement;
  const endDateInput = document.getElementById(
    'datepicker-range-end'
  ) as HTMLInputElement;

  // Initialize Datepicker for start and end date
  if (startDateInput && endDateInput) {
    const startDatepicker = new Datepicker(startDateInput, {
      format: 'dd-mm-yyyy',
      minDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    });
    let endDatepicker = new Datepicker(endDateInput, {
      format: 'dd-mm-yyyy',
      minDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    });

    // Listen for changes and update component properties
    startDateInput.addEventListener('changeDate', (event: any) => {
      this.startDate = event.target.value || '';
      console.log('Start date selected:', this.startDate);

      // Reset end date input and endDatepicker
      endDateInput.value = '';
      this.endDate = '';

      // Destroy existing endDatepicker and create a new one
      endDatepicker.destroy();
      const selectedStartDate = new Date(
        this.startDate.split('-').reverse().join('-')
      );
      console.log('Parsed start date:', selectedStartDate);
      endDatepicker = new Datepicker(endDateInput, {
        format: 'dd-mm-yyyy',
        minDate: new Date(selectedStartDate.setDate(selectedStartDate.getDate() + 1)),
      });
    });

    endDateInput.addEventListener('changeDate', (event: any) => {
      this.endDate = event.target.value || '';
      console.log('End date selected:', this.endDate);

      // Validate end date
      const selectedEndDate = new Date(
        this.endDate.split('-').reverse().join('-')
      );
      const selectedStartDate = new Date(
        this.startDate.split('-').reverse().join('-')
      );
      console.log('Parsed end date:', selectedEndDate);
      console.log('Parsed start date for validation:', selectedStartDate);
      if (selectedEndDate <= selectedStartDate) {
        console.error('End date cannot be before or the same as the start date');
        endDateInput.value = '';
        this.endDate = '';
      }
    });
  }
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

  console.log('Requesting rental with start date:', this.startDate);
  console.log('Requesting rental with end date:', this.endDate);

  this.instrumentService.read(this.instrumentId).subscribe(
    ({ instrument }) => {
      const token = localStorage.getItem('token');
      let renterEmail = '';
      if (token) {
        const decodedToken: any = jwtDecode(token);
        renterEmail = decodedToken.email;
      }

      // Calculate total price according to the difference between dates * instrument day price
      const startDate = new Date(this.startDate.split('-').reverse().join('-'));
      const endDate = new Date(this.endDate.split('-').reverse().join('-'));
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const totalPrice = diffDays * instrument.pricePerDay;

      console.log('Calculated total price:', totalPrice);

      const rentalData: ICreateRental = {
        startDate: startDate,
        endDate: endDate,
        totalPrice: totalPrice,
        reason: this.reason,
        status: RentalStatus.pendingApproval,
        instrumentId: instrument._id,
        instrumentOwnerEmail: instrument.ownerEmail,
        renterEmail: renterEmail,
      };

      console.log('Rental data to be sent:', rentalData);

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

  logDate(type: string, date: string): void {
    console.log(`${type} date selected:`, date);
  }

  closeModal(): void {
    this.router.navigate([{ outlets: { modal: null } }], {
      relativeTo: this.route.parent,
    });
  }


}
