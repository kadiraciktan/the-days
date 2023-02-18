import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [],
  providers: [LoginService],
})
export class ServiceModule {}
