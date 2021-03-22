import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { ORDER_STATUS } from './constants/orders.constants';
import { OrderItem } from './interfaces/orderItem.interface';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true , toJSON: {transform : (doc, ret, options) => {
  const order = {...ret, orderId : ret._id}
  ret.orderId = ret._id;
  return order;
}}})

export class Order {

  @Prop({ autoCreate: true, id: true, autoIndex: true, auto: true })
  orderId: string;

  @Prop({ required: true })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @Prop({ default: ORDER_STATUS.CREATED })
  @IsNotEmpty()
  @IsEnum(ORDER_STATUS)
  orderStatus: ORDER_STATUS;

  @Prop()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  totalPrice: number;
  
  @IsString()
  description: string;

  @Prop({ autoCreate: true })
  @IsArray()
  orderItems: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);