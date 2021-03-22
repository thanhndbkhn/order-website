import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ORDER_STATUS, PAYMENT_STATUS, TIME_DELAY, TIME_WORK } from './constants/orders.constants';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OrdersService {

  private client: ClientProxy;

  constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) { }

  @Cron(`*/${TIME_WORK} * * * * *`)
  async handleCron() {
    const dateCompare = new Date((Date.now() - TIME_DELAY));
    await this.orderModel.updateMany(
      { orderStatus: ORDER_STATUS.CONFIRMED, 
        createdAt: { $lt: dateCompare}
      },
      { $set: { orderStatus: ORDER_STATUS.DELIVERY } });
  }

  async getOrderList(userId: number, limit: number, offset: number): Promise<Order[]> {
    return this.orderModel.find({ userId: userId }).limit(limit).skip(offset * limit).exec();
  }

  async getOrderDetails(orderId: string): Promise<Order> {
    const orderDetails = await this.orderModel.findOne({ _id: orderId });
    if (!orderDetails) {
      throw new NotFoundException('Can not find order');
    }
    return orderDetails;
  }

  async updateOrderStatus(orderId: string, status: ORDER_STATUS): Promise<Order> {
    const order = await this.getOrderDetails(orderId);
    if (order.orderStatus === ORDER_STATUS.DELIVERY || order.orderStatus === ORDER_STATUS.CANCELED) {
      throw new NotFoundException('Order canceled or delivered')
    }
    const canceledOrder = await this.orderModel.updateOne(
      { _id: orderId },
      { $set: { orderStatus: status } });

    if (!canceledOrder) {
      throw new HttpException(
        {
          message: 'Order delivered or canceled',
          data: null,
          errors: 'errors',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return this.getOrderDetails(orderId);
  }

  async verifyPayment(createdOrder: Order): Promise<number> {
    let statusPayment = ORDER_STATUS.CANCELED;
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MICROSERVICES_HOST,
        port: parseInt(process.env.MICROSERVICES_PORT_PAYMENT)
      }
    });
    const response = await this.client.send('verify', createdOrder).pipe().toPromise();
    if (response === PAYMENT_STATUS.CONFIRMED) {

      statusPayment = ORDER_STATUS.CONFIRMED
    }
    return statusPayment;
  }

  async createOrder(order: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel({ ...order, orderStatus: ORDER_STATUS.CREATED });
    await createdOrder.save();
    const statusPayment = await this.verifyPayment(createdOrder);
    return this.updateOrderStatus(createdOrder._id, statusPayment);
  }
}