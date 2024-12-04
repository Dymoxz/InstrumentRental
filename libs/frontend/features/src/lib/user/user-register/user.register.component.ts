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

  const credentials: Omit<IUserInfo, '_id'> = {
    address: address,
    bio: '',
    gender: this.gender,
    phoneNumber: '',
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
  };

  this.userService.register(credentials).subscribe(
    (response) => {
      console.log('Register successful', response);
    },
    (error) => {
      console.error('Register failed', error);
    }
  );
}
}
