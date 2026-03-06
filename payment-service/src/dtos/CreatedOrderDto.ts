class ItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

class PaymentDto {
  method: string;
  installment: number;
}

class Delivery {
  addressId: string;
}

export class CreatedOrderDto {
  customerId: string;
  items: ItemDto[];
  payment: PaymentDto;
  delivery: Delivery;
}
