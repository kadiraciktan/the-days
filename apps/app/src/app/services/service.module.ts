import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services';
import { HttpClientModule } from '@angular/common/http';
import { GameModule } from '@the-days/frontend/game';

@NgModule({
  imports: [CommonModule, HttpClientModule, GameModule],
  exports: [],
  providers: [LoginService],
})
export class ServiceModule {}
