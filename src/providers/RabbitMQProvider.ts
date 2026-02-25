import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQProvider implements OnModuleInit {
  private connection!: Connection;
  private channel!: Channel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const connectionUrl = this.configService.get<string>('RABBITMQ_URL');

    if (!connectionUrl) {
      throw new Error('RABBITMQ_URL not defined');
    }

    this.connection = await amqp.connect(connectionUrl);
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange('orders.exchange', 'topic', {
      durable: true,
    });

    console.log('### RabbitMQ connection established');
  }

  publish(exchange: string, routingKey: string, message: unknown) {
    const newMessage = {
      pattern: routingKey,
      data: message,
    };

    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(newMessage)),
    );
  }
}
