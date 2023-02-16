import * as Phaser from 'phaser';
import { MainScene } from './scenes';

export class GameCanvas extends Phaser.Game {
  constructor(id: string) {
    super({
      type: Phaser.AUTO,
      scene: [MainScene],
      physics: {
        default: 'arcade',
        arcade: {},
      },
      backgroundColor: '#000000',
      scale: {
        mode: Phaser.Scale.FIT,
        parent: id,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
      },
    });
  }
}
