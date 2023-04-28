import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: 'game' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  players: any[] = [];

  handleDisconnect(client: any) {
    console.log('disconnect');
    this.players = this.players.filter((player) => player.id !== client.id);
    console.log(this.players);
    this.server.emit('players', this.players);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('connect');
    const player = {
      id: client.id,
      name: 'Player ' + Math.floor(Math.random() * 100),
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 600),
    };
    this.players.push(player);
    this.server.emit('players', this.players);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() name: any) {
    console.log('message', name);
    this.server.emit('message', 'Welcome to the server ' + name);
  }
}
