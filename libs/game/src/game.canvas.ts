import { Game } from 'phaser';
import { LoginSceneComponent } from './scenes';

export class GameCanvas extends Game {
  constructor(canvas_id: string) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scene: [LoginSceneComponent],
      physics: {
        default: 'arcade',
        arcade: {},
      },
      backgroundColor: '#00000',
      scale: {
        mode: Phaser.Scale.ENVELOP, // Phaser.Scale.RESIZE,
        parent: canvas_id,
        width: 1920,
        height: 1080,
      },
    };
    super(config);
  }
}
