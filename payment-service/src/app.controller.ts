import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreatedOrderDto } from './dtos/CreatedOrderDto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('order.created')
  async payment(order: CreatedOrderDto) {
    await this.appService.process(order);
  }
}
