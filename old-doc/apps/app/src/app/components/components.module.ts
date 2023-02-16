import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameModule } from '@the-days/game';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [
    BrowserModule,
    GameModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [LoginDialogComponent],
})
export class ComponentsModule {}
