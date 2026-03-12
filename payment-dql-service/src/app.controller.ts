import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';
import { Channel, Message } from 'amqplib';

@Controller()
export class AppController {
  @EventPattern('order.created')
  paymentFailed(order: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef() as Channel;
    const originalMsg = context.getMessage() as Message;

    try {
      console.log(order);
      channel.ack(originalMsg);
    } catch (error) {
      console.log(error, 'teste');
      channel.nack(originalMsg, false, false);
    }
  }
}
