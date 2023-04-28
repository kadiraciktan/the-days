import { PlayerGameModel } from '@the-days/shared/models';
import { AllyController, PlayerController } from '../controllers';
import { GameSceneEnum } from './game-scene.enum';
import io from 'socket.io-client';

export class DevelopmentScene extends Phaser.Scene {
  playerController: PlayerController = new PlayerController(this);
  allies: AllyController[] = [];

  constructor() {
    super({ key: GameSceneEnum.DevelopmentScene });
  }

  preload() {
    this.load.spritesheet('player', 'assets/vip.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ally', 'assets/elite.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    // this.loadOffline();
    this.loadSocket();
  }

  override update() {
    this.playerController.update();
  }

  loadOffline() {
    this.playerController = new PlayerController(this);
    this.playerController.create({
      x: 100,
      y: 100,
      socket_id: '123',
      name: 'Player 1',
      rotation: 0,
    });
  }

  loadSocket() {
    const socket = io('ws://localhost:3333/game');
    socket.on('connect', () => {
      console.log('Connected Id', socket.id);
    });
    socket.on('players', (players: PlayerGameModel[]) => {
      for (const ally of this.allies) {
        ally.destroy();
      }
      this.allies = [];
      const allies = players.filter(
        (player: PlayerGameModel) => player.socket_id !== socket.id
      );
      allies.forEach((ally: PlayerGameModel) => {
        const allyController = new AllyController(this);
        allyController.create(ally);
        this.allies.push(allyController);
      });
    });
    socket.on('message', (model: PlayerGameModel) => {
      if (!model) return;
      if (!this.playerController.socketModel) {
        this.playerController.create(model);
      }
      if (model.socket_id === socket.id) {
        this.playerController.socketModel.x = model.x;
        this.playerController.socketModel.y = model.y;
        this.playerController.gameObject.x = model.x;
        this.playerController.gameObject.y = model.y;
        this.playerController.currentRotation = model.rotation;
      }
      const ally = this.allies.find(
        (ally: AllyController) => ally.socketModel.socket_id === model.socket_id
      );
      if (ally) {
        ally.socketModel.x = model.x;
        ally.socketModel.y = model.y;
        ally.gameObject.x = model.x;
        ally.gameObject.y = model.y;
        ally.currentRotation = model.rotation;
        ally.gameObject.rotation = model.rotation;
      }
    });
    setInterval(() => {
      socket.emit('message', this.playerController.socketModel);
    }, 1000 / 60);
  }
}
