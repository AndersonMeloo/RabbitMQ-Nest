import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class ItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  unitPrice: number;
}

class PaymentDto {
  @IsString()
  method: string;

  @IsInt()
  installment: number;
}

class Delivery {
  @IsNotEmpty()
  @IsString()
  addressId: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;

  delivery: Delivery;
}
