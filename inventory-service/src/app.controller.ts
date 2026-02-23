import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('order.created')
  payment(order: any) {
    console.log(order, 'INVENTORY -SERVICE');
  }
}
