import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InstrumentService } from './instrument/instrument.service';
import { InstrumentPageComponent } from './instrument/instrument-page/instrument.page.component';
import { InstrumentFiltersComponent } from './instrument/instrument-filters/instrument.filters.component';
import { InstrumentListComponent } from './instrument/instrument-list/instrument.list.component';
import { InstrumentDetailComponent } from './instrument/instrument-detail/instrument.detail.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserProfileComponent } from './user/user-profile/user.profile.component';
import { MyInstrumentsPageComponent } from './instrument/my-instruments-page/my-instruments.page.component';
import { FrontendCommonModule } from '@instrument-rental/common';
import { InstrumentEditPageComponent } from './instrument/instrument-edit-page/instrument-edit.page.component';
import { FormsModule } from '@angular/forms';
import { ReviewCreateComponent } from './review/review-create/review.create.component';
import { ReviewService } from './review/review.service';
import { ReviewListComponent } from './review/review-list/review.list.component';
import { UserService } from './user/user.service';
import { UserLoginComponent } from './user/user-login/user.login.component';
import { UserRegisterComponent } from './user/user-register/user.register.component';
import { RentalCreateComponent } from './rental/rental-create/rental.create.component';
import { RentalPendingListComponent } from './rental/rental-pending-list/rental-pending.list.component';
import { MyRentalsPageComponent } from './rental/my-rentals-page/my-rentals.page.component';
import { RentalDetailComponent } from './rental/rental-detail/rental.detail.component';
import { RentalService } from './rental/rental.service';
import { RentalLendingOutComponent } from './rental/rental-lending-out/rental.lending-out.component';
import { RentalListComponent } from './rental/rental-list/rental.list.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    FrontendCommonModule,
    FormsModule,
    RouterOutlet,
  ],
  declarations: [
    InstrumentPageComponent,
    InstrumentListComponent,
    InstrumentFiltersComponent,
    InstrumentDetailComponent,

    MyInstrumentsPageComponent,
    InstrumentEditPageComponent,

    ReviewCreateComponent,
    ReviewListComponent,

    UserProfileComponent,
    UserLoginComponent,
    UserRegisterComponent,

    RentalCreateComponent,
    RentalPendingListComponent,
    MyRentalsPageComponent,
    RentalDetailComponent,
    RentalLendingOutComponent,
    RentalListComponent
  ],
  providers: [InstrumentService, ReviewService, UserService, RentalService],
  exports: [],
})
export class FeaturesModule {}
