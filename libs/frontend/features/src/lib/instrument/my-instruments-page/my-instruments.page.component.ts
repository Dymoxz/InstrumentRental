import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InstrumentService } from '../instrument.service';
import { IInstrument } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { DeleteModalComponent, DangerToastComponent } from '@instrument-rental/common';

@Component({
  selector: 'lib-my-instruments-page',
  templateUrl: './my-instruments.page.component.html',
})
export class MyInstrumentsPageComponent implements OnInit, OnDestroy {
  instruments: IInstrument[] | null = null;
  subscription: Subscription | undefined = undefined;
  @ViewChild(DeleteModalComponent) deleteModal: DeleteModalComponent | undefined;
  @ViewChild(DangerToastComponent) dangerToast: DangerToastComponent | undefined;
  instrumentToDelete: IInstrument | null = null;

  constructor(private instrumentService: InstrumentService) {}

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

  openDeleteModal(instrument: IInstrument): void {
    this.instrumentToDelete = instrument;
    this.deleteModal?.open();
  }

  deleteInstrument(): void {
  if (this.instrumentToDelete) {
    this.instrumentService.delete(this.instrumentToDelete.id).subscribe(() => {
      this.instruments = this.instruments?.filter(instrument => instrument.id !== this.instrumentToDelete!.id) || null;
      this.deleteModal?.close();
      this.dangerToast!.toastText = `${this.instrumentToDelete!.name} has been deleted`;
      this.dangerToast!.showToast();
      this.instrumentToDelete = null;
    });
  }
}
}
