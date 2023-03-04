import { AfterViewInit, Component } from '@angular/core';
import { GameService } from '../../services';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements AfterViewInit {
  constructor(private readonly gameService: GameService) {
    console.log('Landing Page');
  }
  ngAfterViewInit() {
    console.log('Landing Page');
    this.gameService.initPhaser('game'); 
  }
}
