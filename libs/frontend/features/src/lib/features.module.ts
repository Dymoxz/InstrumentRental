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
import { MyInstrumentsPageComponent } from './instrument/my-instruments-page/my-instruments.page.component';
import { FrontendCommonModule } from '@instrument-rental/common';
import { InstrumentEditPageComponent } from './instrument/instrument-edit-page/instrument-edit.page.component';
import { FormsModule } from '@angular/forms';
import { ReviewCreateComponent } from './review/review-create/review.create.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    FrontendCommonModule,
    FormsModule,
  ],
  declarations: [
    InstrumentPageComponent,
    InstrumentListComponent,
    InstrumentFiltersComponent,
    InstrumentDetailComponent,

    MyInstrumentsPageComponent,
    InstrumentEditPageComponent,

    ReviewCreateComponent,

    UserProfileComponent,
  ],
  providers: [InstrumentService],
  exports: [],
})
export class FeaturesModule {}
