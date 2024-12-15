import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import {
  InstrumentDetailComponent,
  InstrumentEditPageComponent,
  InstrumentPageComponent,
  MyInstrumentsPageComponent,
  MyRentalsPageComponent,
  RentalCreateComponent,
  RentalDetailComponent,
  RentalPendingListComponent,
  ReviewCreateComponent,
  UserLoginComponent,
  UserProfileComponent,
  UserRegisterComponent,
} from '@instrument-rental/features';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/rent', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'rent', component: InstrumentPageComponent },
  { path: 'profile', component: UserProfileComponent },

  { path: 'review/:id', component: ReviewCreateComponent },

  { path: 'my-instruments', component: MyInstrumentsPageComponent },
  {
    path: 'instrument/new',
    component: InstrumentEditPageComponent,
    pathMatch: 'full',
  },
  { path: 'instrument/:id/edit', component: InstrumentEditPageComponent },
  {
    path: 'instrument/:id',
    component: InstrumentDetailComponent,
    children: [
      {
        path: 'rent',
        component: RentalCreateComponent,
        outlet: 'modal',
      },
    ],
  },
  {
    path: 'rental-pending-list',
    component: RentalPendingListComponent,
    outlet: 'inboxModal',
  },
  {
    path: 'my-rentals',
    component: MyRentalsPageComponent,
  },
  {
    path: 'rental/:id',
    component: RentalDetailComponent,
  },

  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
];
