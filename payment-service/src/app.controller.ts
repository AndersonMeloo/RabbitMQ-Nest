import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KiwifyGateway } from './gateways/payment/KiwifyGateway';
import { CreatedOrderDto } from './dtos/CreatedOrderDto';

@Controller()
export class AppController {
  constructor(private readonly kwifyGateway: KiwifyGateway) {}
  @EventPattern('order.created')
  payment(order: CreatedOrderDto) {
    this.kwifyGateway.paymentProccess(order);
  }
}
