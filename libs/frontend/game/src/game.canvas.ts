import { Game } from 'phaser';
import { GameSceneEnum, LoginScene } from './scenes';
import { LobbyScene } from './scenes/lobby.scene';

export class GameCanvas extends Game {
  constructor(canvas_id: string) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scene: [LoginScene, LobbyScene],
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
    };
    super(config);
  }

  changeScene(scene: GameSceneEnum) {
    if (this.scene.isActive(scene)) {
      return;
    }
    Object.values(GameSceneEnum).forEach((scene) => {
      this.scene.stop(scene);
    });
    this.scene.start(scene);
  }
}
