import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
@Component({
  selector: 'the-days-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'THE DAYS';
  socket = io('http://localhost:3333/game');
  constructor() {
    this.socket.on('players', (data) => {
      console.log('players', data);
    });
  }
  ngOnInit(): void {
    // send message to server
    // this.socket.emit('message',  'Kadir');
    console.log('app');
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
