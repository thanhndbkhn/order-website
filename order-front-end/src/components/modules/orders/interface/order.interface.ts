import { ItemOrder } from "./itemOrder.interface";

export interface Order {
  userId: number,
  orderId?: string,
  description?: string,
  orderItems: ItemOrder[],
  orderStatus?: any,
  totalPrice?: number,
  createdAt?:string
}