// src/chat/chat.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RabbitMQService } from '@/rabbitmq/rabbitmq.service';
import { EventPattern } from '@nestjs/microservices';
import { RabbitMQListener } from '@/rabbitmq/rabbitmq.listener';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly rabbitMQListener: RabbitMQListener,
  ) {}

  @Post('message')
  async sendMessage(@Body() payload: { sender: string; message: string }) {
    await this.rabbitMQService.sendMessage('chat_message', payload);
    return { status: 'message sent' };
  }

  @EventPattern('chat_message')
  handleMessage(payload: any) {
    console.log('event received');
    this.rabbitMQListener.handleMessage(payload);
  }
}
