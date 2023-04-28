import { AfterViewInit, Component } from '@angular/core';
import { GameSceneEnum, GameService } from '@the-days/frontend/game';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements AfterViewInit {
  constructor(private readonly gameService: GameService) {}
  ngAfterViewInit() {
    this.gameService.initPhaser('game');
    this.gameService.changeScene(GameSceneEnum.DevelopmentScene);
  }
}
