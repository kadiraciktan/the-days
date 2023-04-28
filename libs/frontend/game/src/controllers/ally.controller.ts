import { PlayerGameModel } from '@the-days/shared/models';

export class AllyController {
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
      'ally',
      1
    );
    this.gameObject.body = new Phaser.Physics.Arcade.Body(
      this.scene.physics.world,
      this.gameObject
    );
    this.gameObject.body.setCollideWorldBounds(true);
    this.scene.add.existing(this.gameObject);
  }

  destroy() {
    this.gameObject.destroy();
  }
}
