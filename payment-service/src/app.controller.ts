import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KiwifyGateway } from './gateways/payment/KiwifyGateway';

@Controller()
export class AppController {
  constructor(private readonly kwifyGateway: KiwifyGateway) {}
  @EventPattern('order.created')
  payment(order: any) {
    this.kwifyGateway.paymentProccess(order);
  }
}
