import { GameSceneEnum } from './game-scene.enum';

export class LobbyScene extends Phaser.Scene {
  constructor() {
    super({ key: GameSceneEnum.LobbyScene });
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    const logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
      targets: logo,
      x: 450,
      duration: 100,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });
  }
}
