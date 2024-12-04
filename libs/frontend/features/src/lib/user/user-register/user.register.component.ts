import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Address, Gender, IUserInfo } from '@InstrumentRental/shared/api';

@Component({
  selector: 'lib-register',
  templateUrl: './user.register.component.html'
})
export class UserRegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  streetName ='';
  houseNumber =  '';
  postalCode = '';
  city =  '';
  country =  '';
  gender = Gender.other

  constructor(private userService: UserService) {
  }

  onSubmit(): void {

    const address: Address = {
      streetName: this.streetName,
      houseNumber: this.houseNumber,
      postalCode: this.postalCode,
      city: this.city,
      country: this.country
    };


    const credentials: IUserInfo = {
      _id: '', address: address, bio: '', gender: this.gender, phoneNumber: '',
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.userService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Handle successful login, e.g., store token, redirect, etc.
      },
      (error) => {
        console.error('Login failed', error);
        // Handle login error
      }
    );
  }
}
