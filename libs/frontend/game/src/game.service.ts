import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter } from 'rxjs';
import { GameCanvas } from './game.canvas';
import { GameSceneEnum } from './scenes';
import { Socket } from 'socket.io';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private currentScene$ = new BehaviorSubject<GameSceneEnum | undefined>(
    undefined
  );
  private gameScenes$ = new BehaviorSubject<Phaser.Scene[]>([]);
  private game!: Phaser.Game;

  initPhaser(canvas_id: string) {
    this.game = new GameCanvas(canvas_id);
    this.game.events.on('ready', () => {
      this.gameScenes$.next(this.game.scene.scenes);
    });
    combineLatest([this.gameScenes$, this.currentScene$])
      .pipe(filter(([scenes, currentScene]) => !!currentScene))
      .subscribe(([scenes, currentScene]) => {
        scenes.forEach((scene) => {
          if (scene.scene.key === currentScene) {
            this.game.scene.start(scene.scene.key);
          } else {
            this.game.scene.stop(scene.scene.key);
          }
        });
      });
  }

  changeScene(scene: GameSceneEnum) {
    this.currentScene$.next(scene);
  }
}
