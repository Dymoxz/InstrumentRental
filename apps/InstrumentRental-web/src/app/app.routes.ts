import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import {
  InstrumentDetailComponent,
  InstrumentEditPageComponent,
  InstrumentPageComponent,
  MyInstrumentsPageComponent,
  ReviewCreateComponent,
  UserLoginComponent,
  UserProfileComponent,
  UserRegisterComponent,
  RentalCreateComponent, RentalPendingListComponent
} from '@instrument-rental/features';
import {
  MyRentalsPageComponent
} from '../../../../libs/frontend/features/src/lib/rental/my-rentals-page/my-rentals.page.component';


export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rent', component: InstrumentPageComponent },
  { path: 'profile', component: UserProfileComponent },

  { path: 'review', component: ReviewCreateComponent },

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
        outlet: 'modal'
      }
    ]
  },
  {
    path: 'rental-pending-list',
    component: RentalPendingListComponent,
    outlet: 'inboxModal'
  },
  {
    path: 'my-rentals',
    component: MyRentalsPageComponent
  },

  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
];
