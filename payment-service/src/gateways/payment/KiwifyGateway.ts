import { Injectable } from '@nestjs/common';
import { CreatedOrderDto } from '../../dtos/CreatedOrderDto';

@Injectable()
export class KiwifyGateway {
  paymentProccess(data: CreatedOrderDto) {
    console.log('Processing payment with KiwifyGateway', data);
  }
}
