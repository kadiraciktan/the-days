import {
  AfterViewInit,
  Component,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { GameCanvas } from '@the-days/game';
import { LoginPageComponent } from '../login/login-page.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements AfterViewInit {
  constructor(private readonly viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit() {
    const game = new GameCanvas('game_canvas');
  }
}
