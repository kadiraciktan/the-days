import { GameSceneEnum } from './game-scene.enum';
import { PlayerGameModel, RoomGameModel } from '@the-days/shared/models';
import io from 'socket.io-client';

export class DevelopmentScene extends Phaser.Scene {
  room: RoomGameModel = new RoomGameModel();
  textObjects: {
    playerId: string;
    text: Phaser.GameObjects.Text;
  }[] = [];

  constructor() {
    super({ key: GameSceneEnum.DevelopmentScene });
  }

  preload() {
    this.load.on('complete', () => {
      this.load.image('logo', 'assets/logo.png');
      this.add.image(400, 300, 'logo');
    });

    const socket = io('ws://localhost:3333/game');
    socket.on('connect', () => {
      console.log('Connected to Server!');
    });

    socket.on('players', (players: PlayerGameModel[]) => {
      this.textObjects.forEach((textObject) => {
        textObject.text.destroy();
      });

      this.textObjects = [];

      players.forEach((player) => {
        const textObject = this.add.text(player.x, player.y, player.name, {
          color: '#00ff00',
        });
        this.textObjects.push({
          playerId: player.id,
          text: textObject,
        });
      });
    });
  }

  create() {
    console.log('Development Scene Loaded!');
  }
}
