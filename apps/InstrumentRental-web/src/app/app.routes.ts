import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import {
  InstrumentPageComponent,
  InstrumentDetailComponent,
  UserProfileComponent,
  MyInstrumentsPageComponent
} from '@instrument-rental/features';


export const appRoutes: Route[] = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'rent', component: InstrumentPageComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'instrument/:id', component: InstrumentDetailComponent},
  {path: 'my-instruments', component: MyInstrumentsPageComponent},

];
