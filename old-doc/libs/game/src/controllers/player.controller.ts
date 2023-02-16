import { Scene } from 'phaser';
import { IPlayer, PLAYER_LIST, WEAPON_LIST } from '../constants';
import { KeyboardController } from './keyboard.controller';
import { WeaponController } from './weapon.controller';
export class PlayerController {
  // 120 hz = 5
  // 90 hz = 7
  // 60 hz = 15
  // 30 hz = 30
  tickrate = 15;

  movementSpeed = 64;
  currentAngle: number;
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  keyboard: KeyboardController;
  weapon: WeaponController = new WeaponController(this);
  constructor(public scene: Scene) {}
  preload() {
    // Load all player sprites
    Object.values(PLAYER_LIST).forEach((player) => {
      this.scene.load.spritesheet(player.gfx.key, player.gfx.path, {
        frameWidth: 32,
        frameHeight: 32,
      });
    });

    this.weapon.preload();
  }
  create() {
    this.keyboard = new KeyboardController(this.scene);

    this.weapon.create();
    this.body.setFrame(2);
  }
  update() {
    this.setPlayerMovement();
    this.weapon.update();

    if (Math.ceil(this.scene.time.now) % this.tickrate === 0) {
      // this is where we send the player data to the server
    }
  }

  setPlayerMovement() {
    if (this.keyboard.keys.A.isDown) {
      this.body.setVelocityX(-this.movementSpeed);
    } else if (this.keyboard.keys.D.isDown) {
      this.body.setVelocityX(this.movementSpeed);
    }

    if (this.keyboard.keys.W.isDown) {
      this.body.setVelocityY(-this.movementSpeed);
    } else if (this.keyboard.keys.S.isDown) {
      this.body.setVelocityY(this.movementSpeed);
    }

    if (this.keyboard.keys.A.isUp && this.keyboard.keys.D.isUp) {
      this.body.setVelocityX(0);
    }
    1;
    if (this.keyboard.keys.W.isUp && this.keyboard.keys.S.isUp) {
      this.body.setVelocityY(0);
    }

    if (this.keyboard.keys[1].isDown) {
      this.weapon.setWeapon(WEAPON_LIST.ak47);
      this.body.setFrame(2);
    }

    if (this.keyboard.keys[2].isDown) {
      this.weapon.setWeapon(WEAPON_LIST.deagle);
      // set sprite to deagle
      this.body.setFrame(3);
    }

    if (this.keyboard.keys[3].isDown) {
      this.weapon.setWeapon(WEAPON_LIST.thorAxe);
    }
    1;

    this.currentAngle =
      Phaser.Math.Angle.Between(
        this.body.x,
        this.body.y,
        this.scene.input.activePointer.x,
        this.scene.input.activePointer.y
      ) +
      Math.PI / 2;

    this.body.setRotation(this.currentAngle);

    this.weapon.weaponContainer.setPosition(this.body.x, this.body.y);
    this.weapon.weaponContainer.setRotation(this.currentAngle);

    if (this.scene.input.activePointer.isDown) this.weapon.fire();

    // this.currentWeaponSetPosition(this.currentAngle);

    // if (this.keys.ESC.isDown) {
    //   this.keys.ESC.isDown = false;
    //   console.log('ESC is up');
    //   this.isGamePaused = !this.isGamePaused;

    //   console.log('this.isGamePaused', this.isGamePaused);

    //   if (this.isGamePaused) {
    //   }

    //   if (!this.isGamePaused) {
    //     this.scene.input.keyboard.enabled = true;
    //   }
    // }
  }

  setCurrenPlayerSprite(PLAYER_LIST: IPlayer) {
    if (this.body) this.body.destroy();
    this.body = this.scene.physics.add.sprite(100, 450, PLAYER_LIST.gfx.key, 1);
  }
}
