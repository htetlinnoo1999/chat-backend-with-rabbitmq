import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMQConfig } from '@/rabbitmq.config';
import { ChatModule } from './chat/chat.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: rabbitMQConfig.urls,
          queue: rabbitMQConfig.queue,
          queueOptions: rabbitMQConfig.queueOptions,
        },
      },
    ]),
    ChatModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
