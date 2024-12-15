import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Address, Gender, IUser } from '@InstrumentRental/shared/api';

@Component({
  selector: 'lib-register',
  templateUrl: './user.register.component.html'
})
export class UserRegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      streetName: ['', Validators.required],
      houseNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      bio: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: [Gender.other, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const address: Address = {
      streetName: this.registerForm.value.streetName,
      houseNumber: this.registerForm.value.houseNumber,
      postalCode: this.registerForm.value.postalCode,
      city: this.registerForm.value.city,
      country: this.registerForm.value.country
    };

    const credentials: Omit<IUser, '_id'> = {
      address: address,
      bio: this.registerForm.value.bio,
      gender: this.registerForm.value.gender,
      phoneNumber: this.registerForm.value.phoneNumber,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.userService.register(credentials).subscribe(
      (response) => {
        console.log('Register successful', response);
        this.loginAfterRegister({ email: this.registerForm.value.email, password: this.registerForm.value.password });
      },
      (error) => {
        console.error('Register failed', error);
      }
    );
  }

  private loginAfterRegister(credentials: { email: string, password: string }): void {
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
