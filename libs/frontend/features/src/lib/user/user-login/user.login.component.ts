import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { IUserCredentials } from '@InstrumentRental/shared/api';

@Component({
  selector: 'lib-login',
  templateUrl: './user.login.component.html',
})
export class UserLoginComponent {
  email = '';
  password = '';

  constructor(private userService: UserService) {}

  onSubmit(): void {
    const credentials: IUserCredentials = {
      email: this.email,
      password: this.password,
    };

    this.userService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        console.log('token: ', response.token);
         localStorage.setItem('token', response.token!);
      },
      (error) => {
        console.error('Login failed', error);
        // Handle login error
      }
    );
  }
}
