import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { IUserCredentials } from '@InstrumentRental/shared/api';

@Component({
  selector: 'lib-login',
  templateUrl: './user.login.component.html',
})
export class UserLoginComponent {
  loginForm: FormGroup;
  loginError = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: IUserCredentials = this.loginForm.value;

    this.userService.login(credentials).subscribe(
      (response) => {
        if (response && response.token) {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          window.location.href = '/';
        } else {
          this.loginError = true;
          console.error('Login failed: Invalid response', response);
        }
      },
      (error) => {
        this.loginError = true;
        console.error('Login failed', error);
      }
    );
  }
}
