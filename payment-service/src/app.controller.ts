import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';
import { CreatedOrderDto } from './dtos/CreatedOrderDto';
import { AppService } from './app.service';
import { Channel, Message } from 'amqplib';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('order.created')
  async payment(order: CreatedOrderDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef() as Channel;
    const originalMsg = context.getMessage() as Message;

    try {
      await this.appService.process(order);
      channel.ack(originalMsg);
    } catch (error) {
      console.log(error);

      channel.nack(originalMsg, false, false);
    }
  }
}
