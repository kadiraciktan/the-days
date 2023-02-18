import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services';

export type ButtonState = 'login' | 'register';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  currentButtonState: ButtonState = 'login';
  primaryButtonText = 'Login';
  secondaryButtonText = 'Register';

  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  confirmPasswordControl = new FormControl('', [Validators.required]);
  errorMessage = '';

  formGroup?: FormGroup;

  constructor(private readonly loginService: LoginService) {}

  login(formGroup: FormGroup) {
    if (formGroup.valid) {
      console.log(formGroup.value);
      this.loginService
        .login(formGroup.value.email, formGroup.value.password)
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      this.errorMessage = 'Please fill out all fields';
    }
  }

  register(formGroup: FormGroup) {
    if (formGroup.valid) {
      console.log(formGroup.value);
    } else {
      if (this.passwordControl.value !== this.confirmPasswordControl.value) {
        this.errorMessage = 'Passwords do not match';
      } else {
        this.errorMessage = 'Please fill out all fields';
      }
    }
  }

  onPrimaryButtonClick() {
    if (this.currentButtonState === 'login') {
      const formGroup = new FormGroup({
        email: this.emailControl,
        password: this.passwordControl,
      });
      this.login(formGroup);
    } else {
      const formGroup = new FormGroup({
        email: this.emailControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
      });
      this.register(formGroup);
    }
  }

  onSecondaryButtonClick() {
    if (this.currentButtonState === 'login') {
      this.currentButtonState = 'register';
      this.primaryButtonText = 'Register';
      this.secondaryButtonText = 'Cancel';
    } else {
      this.currentButtonState = 'login';
      this.primaryButtonText = 'Login';
      this.secondaryButtonText = 'Register';
    }
  }
}
