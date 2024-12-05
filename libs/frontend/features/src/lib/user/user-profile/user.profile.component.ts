import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser, IUserIdentity } from '@InstrumentRental/shared/api';

@Component({
  selector: 'lib-profile',
  templateUrl: './user.profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user: IUser | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((user: IUser | null) => {
      this.user = user;
    });
  }
}
