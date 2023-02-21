import { GameSceneEnum } from './game-scene.enum';

export class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: GameSceneEnum.LoginScene });
  }
  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    const logo = this.add.image(400, 150, 'logo');
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });
  }
}
