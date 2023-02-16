import { KeyboardKeys } from '../constants';

export class KeyboardController extends Phaser.Input.InputPlugin {
  keys: KeyboardKeys;
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.keys = {
      W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      1: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
      3: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
      ESC: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    };
  }
}
