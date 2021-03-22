import { IsNotEmpty, IsArray } from 'class-validator';
import { OrderItem } from '../interfaces/orderItem.interface';

import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: [
      { product: { productId: 1, productName: 'Product 1', urlImage: 'abc', price: 200 }, quantity: 1 },
      { product: { productId: 2, productName: 'Product 2', urlImage: 'abc', price: 300 }, quantity: 1 }
    ]
  })
  @IsArray()
  @IsNotEmpty()
  orderItems: OrderItem[];

  @ApiProperty({ example: 500 })
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ example: 'This is description' })
  description: string;
}
