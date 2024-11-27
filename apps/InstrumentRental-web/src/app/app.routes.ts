import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { InstrumentPageComponent, InstrumentDetailComponent } from '@instrument-rental/features';
import { ProfileComponent } from './components/profile/profile.component';


export const appRoutes: Route[] = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'rent', component: InstrumentPageComponent},
  {path: 'profile', component: ProfileComponent},
  { path: 'instrument/:id', component: InstrumentDetailComponent },

];
