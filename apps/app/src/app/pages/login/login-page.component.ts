import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  confirmPasswordControl = new FormControl('', [Validators.required]);

  onPrimaryButtonClick() {
    if (this.currentButtonState === 'login') {
      console.log('Login');
    } else {
      console.log('Register');
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
