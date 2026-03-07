import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const routingKey = configService.getOrThrow<string>('RABBIT_ORDER_KEY');

  const rabbitUrl = configService.getOrThrow<string>('RABBITMQ_URL');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrl],
      queue: 'payment.order.created',
      exchange: 'orders.exchange',
      exchangeType: 'topic',
      routingKey,
      queueOptions: {
        durable: true,
      },
    },
    noAck: false,
  });
  await app.listen();
}
bootstrap();
