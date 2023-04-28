import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LoginService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameSceneEnum, GameService } from '@the-days/frontend/game';

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

  constructor(
    private readonly loginService: LoginService,
    private readonly snackBar: MatSnackBar,
    private readonly gameService: GameService
  ) {}

  login(formGroup: FormGroup) {
    if (formGroup.valid) {
      console.log(formGroup.value);
      firstValueFrom(
        this.loginService.login(formGroup.value.email, formGroup.value.password)
      ).then((response) => {
        console.log(response);
        if (!response) {
          this.snackBar.open('Invalid Credentials', 'Close', {
            horizontalPosition: 'center',
          });
          return;
        }
      });
    } else {
      this.snackBar.open('Please fill out all fields', 'Close', {
        horizontalPosition: 'center',
      });
    }
  }

  register(formGroup: FormGroup) {
    if (formGroup.valid) {
      console.log(formGroup.value);
      firstValueFrom(
        this.loginService.register(
          formGroup.value.email,
          formGroup.value.password
        )
      )
        .then((response) => {
          console.log(response);
        })
        .catch((response) => {
          this.snackBar.open(response.error.message, 'Close', {
            horizontalPosition: 'center',
          });
        });
    } else {
      if (this.passwordControl.value !== this.confirmPasswordControl.value) {
        this.snackBar.open('Passwords do not match', 'Close', {
          horizontalPosition: 'center',
        });
        return;
      }
      this.snackBar.open('Please fill out all fields', 'Close', {
        horizontalPosition: 'center',
      });
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
