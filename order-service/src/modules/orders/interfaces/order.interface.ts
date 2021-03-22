import { ORDER_STATUS } from "../constants/orders.constants";
import { OrderItem } from "./orderItem.interface";

export interface Order {
  orderId: string;
  userId: number;
  orderStatus: ORDER_STATUS;
  totalPrice: number;
  description: string;
  orderItems: OrderItem[];
}