import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceModule } from '../services';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LandingPageComponent } from './landing/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },

  {
    path: 'login',
    component: LoginPageComponent,
  },
];

@NgModule({
  declarations: [LoginPageComponent, LandingPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ServiceModule,
    MatSnackBarModule,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
