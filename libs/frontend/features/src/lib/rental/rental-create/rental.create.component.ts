import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalService } from '../rental.service';
import { InstrumentService } from '../../instrument/instrument.service';
import { ICreateRental, IRental, RentalStatus } from '@InstrumentRental/shared/api';
import { jwtDecode } from 'jwt-decode';

declare let Datepicker: any;

@Component({
  selector: 'lib-rental-create',
  templateUrl: './rental.create.component.html',
})
export class RentalCreateComponent implements OnInit, AfterViewInit {
  rentalForm: FormGroup;
  instrumentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private instrumentService: InstrumentService
  ) {
    this.rentalForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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

    if (startDateInput && endDateInput) {
      const startDatepicker = new Datepicker(startDateInput, {
        format: 'dd-mm-yyyy',
        minDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      });
      let endDatepicker = new Datepicker(endDateInput, {
        format: 'dd-mm-yyyy',
        minDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      });

      startDateInput.addEventListener('changeDate', (event: any) => {
        this.rentalForm.get('startDate')?.setValue(event.target.value || '');
        endDateInput.value = '';
        this.rentalForm.get('endDate')?.setValue('');

        endDatepicker.destroy();
        const selectedStartDate = new Date(this.rentalForm.get('startDate')?.value.split('-').reverse().join('-'));
        endDatepicker = new Datepicker(endDateInput, {
          format: 'dd-mm-yyyy',
          minDate: new Date(selectedStartDate.setDate(selectedStartDate.getDate() + 1)),
        });
      });

      endDateInput.addEventListener('changeDate', (event: any) => {
        this.rentalForm.get('endDate')?.setValue(event.target.value || '');

        const selectedEndDate = new Date(this.rentalForm.get('endDate')?.value.split('-').reverse().join('-'));
        const selectedStartDate = new Date(this.rentalForm.get('startDate')?.value.split('-').reverse().join('-'));
        if (selectedEndDate <= selectedStartDate) {
          console.error('End date cannot be before or the same as the start date');
          endDateInput.value = '';
          this.rentalForm.get('endDate')?.setValue('');
        }
      });
    }
  }

  requestRental(): void {
    if (this.rentalForm.invalid || !this.instrumentId) {
      console.error('Form is invalid or instrument ID is missing');
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

        const startDate = new Date(this.rentalForm.get('startDate')?.value.split('-').reverse().join('-'));
        const endDate = new Date(this.rentalForm.get('endDate')?.value.split('-').reverse().join('-'));
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const totalPrice = diffDays * instrument.pricePerDay;

        const rentalData: ICreateRental = {
          startDate: startDate,
          endDate: endDate,
          totalPrice: totalPrice,
          reason: this.rentalForm.get('reason')?.value,
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

  closeModal(): void {
    this.router.navigate([{ outlets: { modal: null } }], {
      relativeTo: this.route.parent,
    });
  }
}
