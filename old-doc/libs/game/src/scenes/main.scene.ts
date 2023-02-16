import * as Phaser from 'phaser';
import { PLAYER_LIST } from '../constants';
import { PlayerController } from '../controllers';
export class MainScene extends Phaser.Scene {
  currentPlayer = new PlayerController(this);
  constructor() {
    super('MainScene');
  }

  preload() {
    this.currentPlayer.preload();
  }

  create() {
    this.currentPlayer.setCurrenPlayerSprite(PLAYER_LIST.vip);
    this.currentPlayer.create();
  }

  override update() {
    this.currentPlayer.update();
  }
}
