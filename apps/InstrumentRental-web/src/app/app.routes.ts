import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import {
  InstrumentPageComponent,
  InstrumentDetailComponent,
  UserProfileComponent,
  MyInstrumentsPageComponent,
  InstrumentEditPageComponent, ReviewCreateComponent
} from '@instrument-rental/features';
import { UserLoginComponent } from '@instrument-rental/features';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rent', component: InstrumentPageComponent },
  { path: 'profile', component: UserProfileComponent },

  { path: 'review', component: ReviewCreateComponent },

  { path: 'my-instruments', component: MyInstrumentsPageComponent },
  { path: 'instrument/new', component: InstrumentEditPageComponent, pathMatch: 'full' },
  { path: 'instrument/:id/edit', component: InstrumentEditPageComponent },
  { path: 'instrument/:id', component: InstrumentDetailComponent, pathMatch: 'full' },
  {path: 'login', component: UserLoginComponent }
];
