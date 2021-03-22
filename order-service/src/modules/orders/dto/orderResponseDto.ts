import { ApiProperty } from "@nestjs/swagger";
import { ORDER_STATUS } from "../constants/orders.constants";
import { Order } from "../order.schema";


export class OrderResponseDto {
  @ApiProperty({ example: 1 })
  orderId: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: ORDER_STATUS.CONFIRMED })
  orderStatus: ORDER_STATUS;

  @ApiProperty({ example: 200 })
  totalPrice: number;

  @ApiProperty({ example: "This is Description" })
  description: string;

  @ApiProperty({ example: [{ product: { productId: 1, productName: 'Product 1', urlImage: 'abc', price: 200 }, quantity: 1 }] })
  orderItems: Order[];

  @ApiProperty({ example: "2021-03-09T07:38:47.406Z" })
  createdAt: string;
}