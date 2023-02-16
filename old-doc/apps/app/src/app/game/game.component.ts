import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameCanvas } from '@the-days/game';
@Component({
  selector: 'the-days-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  ngOnInit(): void {
    new GameCanvas('game');
  }
}
