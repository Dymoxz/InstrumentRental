import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InstrumentService } from './instrument/instrument.service';
import { InstrumentPageComponent } from './instrument/instrument-page/instrument.page.component';
import { InstrumentFiltersComponent } from './instrument/instrument-filters/instrument.filters.component';
import { InstrumentListComponent } from './instrument/instrument-list/instrument.list.component';
import { InstrumentDetailComponent } from './instrument/instrument-detail/instrument.detail.component';
import { RouterLink } from '@angular/router';
import { UserProfileComponent } from './user/user-profile/user.profile.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink],
  declarations: [
    InstrumentPageComponent,
    InstrumentListComponent,
    InstrumentFiltersComponent,
    InstrumentDetailComponent,

    UserProfileComponent
  ],
  providers: [InstrumentService],
  exports: [],
})
export class FeaturesModule {}
