// src/chat/chat.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RabbitMQService } from '@/rabbitmq/rabbitmq.service';
import { RabbitMQListener } from '@/rabbitmq/rabbitmq.listener';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly rabbitMQListener: RabbitMQListener,
  ) {}

  afterInit(server: Server) {
    console.log('initialized');
    this.rabbitMQListener.setServer(server);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    payload: { sender: string; message: string },
  ): void {
    this.rabbitMQService.sendMessage('chat_message', payload);
  }
}
