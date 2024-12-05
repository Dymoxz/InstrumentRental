import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Address, Gender, IUserInfo, IUserCredentials } from '@InstrumentRental/shared/api';

@Component({
  selector: 'lib-register',
  templateUrl: './user.register.component.html'
})
export class UserRegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  streetName = '';
  houseNumber = '';
  postalCode = '';
  city = '';
  country = '';
  bio = '';
  phoneNumber = '';
  gender = Gender.other;

  constructor(private userService: UserService) {}

  onSubmit(): void {
    const address: Address = {
      streetName: this.streetName,
      houseNumber: this.houseNumber,
      postalCode: this.postalCode,
      city: this.city,
      country: this.country
    };

    const credentials: Omit<IUserInfo, '_id'> = {
      address: address,
      bio: this.bio,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    this.userService.register(credentials).subscribe(
      (response) => {
        console.log('Register successful', response);
        this.loginAfterRegister({ email: this.email, password: this.password });
      },
      (error) => {
        console.error('Register failed', error);
      }
    );
  }

  private loginAfterRegister(credentials: IUserCredentials): void {
    this.userService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        console.log('token: ', response.token);
        localStorage.setItem('token', response.token!);
        window.location.href = '/';
      },
      (error) => {
        console.error('Login after register failed', error);
      }
    );
  }
}
