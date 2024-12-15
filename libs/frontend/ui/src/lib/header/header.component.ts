import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '@InstrumentRental/shared/api';
import { UserService, RentalService } from '@instrument-rental/features';
import { RentalStatus } from '@InstrumentRental/shared/api';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: IUser | null | undefined;
  hasPendingRentals = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    this.isLoggedIn = !!localStorage.getItem('token');

    if (this.isLoggedIn) {
      const token = localStorage.getItem('token');
      let userEmail = '';
      if (token) {
        const decodedToken: any = jwtDecode(token);
        userEmail = decodedToken.email;
      }

      this.rentalService.getByStatusAndOwnerEmail(RentalStatus.pendingApproval, userEmail).subscribe((rentals) => {
        this.hasPendingRentals = rentals.length > 0;
      });
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  openInboxModal(): void {
    this.router.navigate([{ outlets: { inboxModal: ['rental-pending-list'] } }]);
  }
}
