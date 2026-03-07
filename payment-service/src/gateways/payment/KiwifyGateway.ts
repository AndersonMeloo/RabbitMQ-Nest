import { Injectable } from '@nestjs/common';
import { CreatedOrderDto } from '../../dtos/CreatedOrderDto';

@Injectable()
export class KiwifyGateway {
  async paymentProccess(data: CreatedOrderDto) {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    throw new Error('Error on payment gateway');
    console.log('Processing payment with KiwifyGateway', data);
  }
}
