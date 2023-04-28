import { AfterViewInit, Component } from '@angular/core';
import { GameService } from '@the-days/frontend/game';
@Component({
  selector: 'app-development-page',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss'],
})
export class DevelopmentPageComponent implements AfterViewInit {
  constructor(private readonly gameService: GameService) {
    console.log('Development Page');
  }
  ngAfterViewInit() {
    console.log('');
  }
}
