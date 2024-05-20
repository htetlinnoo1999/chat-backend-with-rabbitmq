// src/rabbitmq.config.ts
export const rabbitMQConfig = {
  urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
  queue: 'chat_queue',
  queueOptions: {
    durable: false,
  },
};
