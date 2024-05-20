import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { rabbitMQConfig } from '@/rabbitmq.config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private client: ClientProxy;
  private readonly logger = new Logger(RabbitMQService.name);

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: rabbitMQConfig.urls,
        queue: rabbitMQConfig.queue,
        queueOptions: rabbitMQConfig.queueOptions,
      },
    });
  }

  async sendMessage(pattern: string, message: any) {
    this.logger.log(`Sending message to RabbitMQ: ${JSON.stringify(message)}`);
    try {
      await lastValueFrom(this.client.emit(pattern, message));
      this.logger.log('Message sent successfully');
    } catch (error) {
      this.logger.error('Failed to send message to RabbitMQ', error.stack);
      throw error;
    }
  }
}
