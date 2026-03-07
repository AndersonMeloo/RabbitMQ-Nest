import { Injectable } from '@nestjs/common';
import { CreatedOrderDto } from '../../dtos/CreatedOrderDto';

@Injectable()
export class KiwifyGateway {
  paymentProccess(data: CreatedOrderDto) {
    throw new Error('Error on payment gateway');
    console.log('Processing payment with KiwifyGateway', data);
  }
}
