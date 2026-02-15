class ItemDto {
  producId: string;
  quantity: number;
  unitPrice: number;
}

class PaymentDto {
  method: string;
  installment: number;
}

class Delivery {
  adressId: string;
}

export class CreateOrderDto {
  customerId: string;

  items: ItemDto[];

  payment: PaymentDto;

  delivery: Delivery;
}
