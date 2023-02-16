import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent implements OnInit {
  userNameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  passwordAgainControl = new FormControl('', [Validators.required]);

  isRegisterState = false;
  actionButtonLabel = 'Login';
  secondActionButtonLabel = 'Register';

  ngOnInit() {
    console.log('ngOnInit');
  }

  onAction() {
    if (this.isRegisterState) {
      this.register();
    } else {
      this.login();
    }
  }

  onSecondAction() {
    if (this.isRegisterState) {
      this.isRegisterState = false;
      this.secondActionButtonLabel = 'Register';
      this.actionButtonLabel = 'Login';
      return;
    } else {
      this.isRegisterState = true;
      this.secondActionButtonLabel = 'Cancel';
      this.actionButtonLabel = 'Register';
    }
  }

  register() {
    console.log('LoginDialogComponent.register');
  }

  login() {
    console.log('LoginDialogComponent.login');
  }
}
