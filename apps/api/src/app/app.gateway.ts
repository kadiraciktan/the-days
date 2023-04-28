import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PlayerGameModel } from '@the-days/shared/models';

@WebSocketGateway({ cors: true, namespace: 'game' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  players: PlayerGameModel[] = [];

  handleDisconnect(client: any) {
    console.log('Player disconnected');
    this.players = this.players.filter(
      (player: PlayerGameModel) => player.socket_id !== client.id
    );
    this.server.emit('players', this.players);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('New player connected');
    const player: PlayerGameModel = {
      socket_id: client.id,
      name: 'Player ' + Math.floor(Math.random() * 100),
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 600),
      rotation: 0,
    };
    this.players.push(player);
    console.log(this.players);
    this.server.emit('players', this.players);
    this.server.emit('message', player);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() model: any) {
    if (!model) return;
    const player = this.players.find(
      (player: PlayerGameModel) => player.socket_id === model.socket_id
    );

    if (player) {
      player.x = model.x;
      player.y = model.y;
      player.rotation = model.rotation;
      this.server.emit('message', player);
    }
  }
}
