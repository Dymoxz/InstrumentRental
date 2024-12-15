import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, FooterComponent } from '@instrument-rental/ui';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import {
  FeaturesModule,
  InstrumentService,
  SearchService,
  UserService,
  ReviewService,
  RentalService
} from '@instrument-rental/features';


@Component({
  standalone: true,
  imports: [RouterModule, FeaturesModule, HeaderComponent, FooterComponent],
  providers: [InstrumentService, ReviewService, UserService, SearchService, RentalService],
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  title = 'InstrumentRental';

  ngOnInit(): void {
    initFlowbite();
  }
}
