import { Injectable } from '@nestjs/common';
import { CreatedOrderDto } from '../../payment-service/src/dtos/CreatedOrderDto';
import { KiwifyGateway } from './gateways/payment/KiwifyGateway';

const MAX_ATTEMPTS = 3;
const DELAY = 5000;

@Injectable()
export class AppService {
  constructor(private readonly kiwifyGateway: KiwifyGateway) {}

  async process(order: CreatedOrderDto) {
    let lastError: Error = new Error('Unknown error');

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        return this.kiwifyGateway.paymentProccess(order);
      } catch (err) {
        lastError = err as Error;
        console.log(`Attempt ${attempt} Retrying in ${DELAY / 1000} seconds`);
        await new Promise((resolve) => setTimeout(resolve, DELAY));
      }
    }
    throw lastError;
  }
}

// Tentativa 1 → erro → espera 5s
// Tentativa 2 → erro → espera 5s
// Tentativa 3 → erro → lança erro final
