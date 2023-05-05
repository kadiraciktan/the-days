import { Game, ScaleModes } from 'phaser';
import { DevelopmentScene, LoginScene } from './scenes';
import { LobbyScene } from './scenes/lobby.scene';

export class GameCanvas extends Game {
  constructor(canvas_id: string) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1024,
      height: 768,
      parent: canvas_id,
      scene: [LoginScene, LobbyScene, DevelopmentScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        },
      },
      fps: {
        target: 60,
      },
      scale: {
        zoom: 1,
      },
    };

    super(config);
  }
}
