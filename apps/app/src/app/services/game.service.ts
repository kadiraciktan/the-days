import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GameCanvas, GameSceneEnum } from '@the-days/frontend/game';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game!: GameCanvas;
  initPhaser(canvas_id: string) {
    this.game = new GameCanvas();
  }

  changeScene(scene: GameSceneEnum) {
    this.game.changeScene(scene);
  }
}
