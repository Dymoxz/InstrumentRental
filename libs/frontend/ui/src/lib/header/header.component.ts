import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUser, IUserIdentity } from '@InstrumentRental/shared/api';
import { UserService } from '@instrument-rental/features';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: IUserIdentity | null | undefined
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((user) => {
      this.user = user;
      console.log(user)
    })
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
