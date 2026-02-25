import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQProvider } from '../providers/RabbitMQProvider';

@Module({
  imports: [ConfigModule],
  controllers: [OrderController],
  providers: [OrderService, RabbitMQProvider],
})
export class OrderModule {}
