import { Module } from '@nestjs/common';
import { ChatGateway } from '@/chat/chat.gateway';
import { ChatController } from '@/chat/chat.controller';
import { RabbitmqModule } from '@/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  controllers: [ChatController],
  providers: [ChatGateway],
})
export class ChatModule {}
