import { PlayerGameModel } from '@the-days/shared/models';

export class PlayerController {
  gameObject: Phaser.GameObjects.Sprite;
  name: string;
  socketModel: PlayerGameModel;

  currentRotation: number;
  constructor(private readonly scene: Phaser.Scene) {}

  create(playerModel: PlayerGameModel) {
    this.socketModel = playerModel;
    this.gameObject = new Phaser.GameObjects.Sprite(
      this.scene,
      playerModel.x,
      playerModel.y,
      'player',
      1
    );
    this.gameObject.body = new Phaser.Physics.Arcade.Body(
      this.scene.physics.world,
      this.gameObject
    );
    this.gameObject.body.collideWorldBounds = true;
    this.scene.add.existing(this.gameObject);
    this.scene.physics.add.existing(this.gameObject);
    this.gameObject.body.setCollideWorldBounds(true);
  }

  update() {
    if (this.gameObject && this.scene && this.scene.input.keyboard) {
      if (this.scene.input.keyboard.addKey('W').isDown) {
        this.gameObject.y -= 1;
      }

      if (this.scene.input.keyboard.addKey('A').isDown) {
        this.gameObject.x -= 1;
      }

      if (this.scene.input.keyboard.addKey('S').isDown) {
        this.gameObject.y += 1;
      }

      if (this.scene.input.keyboard.addKey('D').isDown) {
        this.gameObject.x += 1;
      }
      this.socketModel.x = this.gameObject.x;
      this.socketModel.y = this.gameObject.y;
    }

    if (this.gameObject && this.scene && this.scene.input.mousePointer) {
      this.currentRotation =
        Phaser.Math.Angle.Between(
          this.gameObject.x,
          this.gameObject.y,
          this.scene.input.activePointer.x,
          this.scene.input.activePointer.y
        ) +
        Math.PI / 2;

      this.gameObject.setRotation(this.currentRotation);
      this.socketModel.rotation = this.currentRotation;
    }
  }
}
