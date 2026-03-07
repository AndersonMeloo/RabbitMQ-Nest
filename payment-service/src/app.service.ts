import { Injectable } from '@nestjs/common';
import { CreatedOrderDto } from './dtos/CreatedOrderDto';
import { KiwifyGateway } from './gateways/payment/KiwifyGateway';
import { Retry } from './decorators/retry.decorator';

@Injectable()
export class AppService {
  constructor(private readonly kiwifyGateway: KiwifyGateway) {}

  @Retry()
  async process(order: CreatedOrderDto) {
    return await this.kiwifyGateway.paymentProccess(order);
  }
}

// Tentativa 1 → erro → espera 5s
// Tentativa 2 → erro → espera 5s
// Tentativa 3 → erro → lança erro final
