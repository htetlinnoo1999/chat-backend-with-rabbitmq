import { Module } from '@nestjs/common';
import { RabbitMQListener } from '@/rabbitmq/rabbitmq.listener';
import { RabbitMQService } from '@/rabbitmq/rabbitmq.service';

@Module({
  providers: [RabbitMQListener, RabbitMQService],
  exports: [RabbitMQListener, RabbitMQService],
})
export class RabbitmqModule {}
