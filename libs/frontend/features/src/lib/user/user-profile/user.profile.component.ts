import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@InstrumentRental/shared/api';

@Component({
  selector: 'lib-profile',
  templateUrl: './user.profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user: IUser | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.list().subscribe((users: IUser[] | null) => {
      if (users && users.length > 0) {
        this.user = users[1]; // Use the first user for now
      }
    });
  }
}
