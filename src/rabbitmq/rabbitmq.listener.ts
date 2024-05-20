import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class RabbitMQListener {
  private server: Server;

  setServer(server: Server) {
    console.log(server);
    this.server = server;
  }

  handleMessage(payload: any) {
    if (this.server) {
      this.server.emit('chatToClient', payload);
    }
  }
}
