import { Injectable } from '@nestjs/common';

@Injectable()
export class KiwifyGateway {
  paymentProccess(data: any) {
    console.log('Processing payment with KiwifyGateway', data);
  }
}
