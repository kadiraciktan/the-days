import { Game, ScaleModes } from 'phaser';
import { DevelopmentScene, LoginScene } from './scenes';
import { LobbyScene } from './scenes/lobby.scene';

export class GameCanvas extends Game {
  constructor(canvas_id: string) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: '100vw',
      height: '100vh',
      parent: canvas_id,
      scene: [LoginScene, LobbyScene, DevelopmentScene],
      physics: {
        default: 'arcade',
      },
      fps: {
        target: 60,
      },
    };

    super(config);
  }
}
