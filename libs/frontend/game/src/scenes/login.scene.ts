import { GameSceneEnum } from './game-scene.enum';

export class LoginScene extends Phaser.Scene {
  stars: Phaser.GameObjects.Graphics[] = [];
  pointerX = 0;
  pointerY = 0;

  constructor() {
    super({ key: GameSceneEnum.LoginScene });
  }
  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.generateStars();

    this.input.on('pointermove', (pointer: any) => {
      this.stars.forEach((star) => {
        star.x = star.x - (this.pointerX - pointer.x) / 10;
        star.y = star.y - (this.pointerY - pointer.y) / 10;
      });
      this.pointerX = pointer.x;
      this.pointerY = pointer.y;
    });

    this.input.gamepad.once('connected', (pad: any) => {
      console.log('Gamepad Connected', pad.id);

      pad.on('down', (button: any, index: number) => {
        console.log('down', button, index);
      });
    });
  }

  override update(time: number, delta: number): void {
    const pad = this.input.gamepad.getPad(0);
    if (pad) {
      this.stars.forEach((star) => {
        star.x = star.x - pad.axes[0].getValue() * 2;
        star.y = star.y - pad.axes[1].getValue() * 2;

        if (star.x < 0) {
          star.x = 0;
        }
        if (star.x > this.scene.systems.canvas.width) {
          star.x = this.scene.systems.canvas.width;
        }
        if (star.y < 0) {
          star.y = 0;
        }
        if (star.y > this.scene.systems.canvas.height) {
          star.y = this.scene.systems.canvas.height;
        }
      });
      console.log(pad.axes);
    }
  }

  generateStars() {
    for (let i = 0; i < this.scene.systems.canvas.width; i++) {
      const graphics = this.add.graphics();
      graphics.fillStyle(0xffffff, 1);
      graphics.fillPoint(
        Math.floor(Math.random() * this.scene.systems.canvas.width * 2),
        Math.floor(Math.random() * this.scene.systems.canvas.height * 2),
        2
      );

      this.stars.push(graphics);

      this.tweens.add({
        targets: graphics,
        alpha: { from: 0.5, to: 1 },
        delay: Math.floor(Math.random() * 1000),
        duration: 1000,
        ease: 'Power2',
        yoyo: true,
        loop: -1,
      });
    }
  }
}
