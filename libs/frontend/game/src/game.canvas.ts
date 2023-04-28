import { Game } from 'phaser';
import { DevelopmentScene, LoginScene } from './scenes';
import { LobbyScene } from './scenes/lobby.scene';

export class GameCanvas extends Game {
  constructor(canvas_id: string) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scene: [LoginScene, DevelopmentScene, LobbyScene],
      physics: {
        default: 'arcade',
        arcade: {},
      },
      input: {
        gamepad: true,
      },
      backgroundColor: '#00000',
      scale: {
        mode: Phaser.Scale.ENVELOP, // Phaser.Scale.RESIZE,
        parent: canvas_id,
        width: '100vh',
        height: '100vh',
      },
      autoFocus: false,
    };

    super(config);
  }
}
