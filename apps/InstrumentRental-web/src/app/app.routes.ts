import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { RentComponent } from './components/rent/rent.component';
import { InstrumentComponent } from './entity/instrument/instrument.component';
import { ProfileComponent } from './components/profile/profile.component';


export const appRoutes: Route[] = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'rent', component: RentComponent},
  {path: 'profile', component: ProfileComponent},
  { path: 'instrument/:id', component: InstrumentComponent },

];
