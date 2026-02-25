import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { RabbitMQProvider } from 'src/providers/RabbitMQProvider';

@Injectable()
export class OrderService {
  constructor(private readonly rabbitMQProvider: RabbitMQProvider) {}

  save(order: CreateOrderDto) {
    this.rabbitMQProvider.publish('orders.exchange', 'order.created', order);
    return order;
  }
}
