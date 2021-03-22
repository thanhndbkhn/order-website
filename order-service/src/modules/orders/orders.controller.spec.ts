import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import * as mongoose from 'mongoose';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { OrderSchema } from './order.schema';
import { OrdersModule } from './orders.module';
import { ORDER_STATUS } from './constants/orders.constants';

let mongo: any;

describe('OrdersController', () => {
  let ordersController: OrdersController;
  beforeAll(async () => {
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    const mongoUri = await mongo.getUri();

    for (const collection of collections) {
      await collection.deleteMany({});
    }

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {
            name: 'Order',
            schema: OrderSchema,
          },
        ]),
        ClientsModule.register([
          {
            name: 'ORDER_SERVICE',
            transport: Transport.TCP,
            options: {
              host: process.env.MICROSERVICES_HOST,
              port: parseInt(process.env.MICROSERVICES_PORT_PAYMENT)
            }
          },
        ]),
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: mongoUri,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
          }),
        }),
        OrdersModule
      ],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });
  describe('Create Order', () => {
    it('should return order with valid id"', async () => {
      const order: any = {
        userId: 1,
        orderItems: [
          { product: { productId: "4", productName: "Easy Polo 1", price: 400, imageUrl: '' }, quantity: 2 },
          { product: { productId: "3", productName: "Easy Polo 1", price: 300, imageUrl: '' }, quantity: 1 }
        ],
        totalPrice: 700
      }

      const createdOrder = await ordersController.createOrder(order);
      expect(createdOrder.totalPrice).toEqual(order.totalPrice);
    });
  });

  describe('Get List Order', () => {
    it('create 3 Order => to get list record = 3', async () => {
      const orderFirst: any = {
        userId: 1,
        orderItems: [
          { product: { productId: "4", productName: "Easy Polo 1", price: 400, imageUrl: '' }, quantity: 2 },
          { product: { productId: "3", productName: "Easy Polo 2", price: 300, imageUrl: '' }, quantity: 1 }
        ],
        totalPrice: 700
      }
      const orderSecond: any = {
        userId: 1,
        orderItems: [
          { product: { productId: "4", productName: "Easy Polo 1", price: 400, imageUrl: '' }, quantity: 2 },
          { product: { productId: "3", productName: "Easy Polo 3", price: 500, imageUrl: '' }, quantity: 1 }
        ],
        totalPrice: 900
      }
      const orderThird: any = {
        userId: 1,
        orderItems: [
          { product: { productId: "4", productName: "Easy Polo 1", price: 400, imageUrl: '' }, quantity: 2 },
          { product: { productId: "3", productName: "Easy Polo 4", price: 600, imageUrl: '' }, quantity: 1 }
        ],
        totalPrice: 1000
      }

      await ordersController.createOrder(orderFirst);
      await ordersController.createOrder(orderSecond);
      await ordersController.createOrder(orderThird);

      const responseList = await ordersController.getOrderList({ userId: 1, limit: 3, offset: 0 });
      expect(responseList.length).toEqual(3);
    })
  })

  describe('Get Detail Order', () => {
    it('create Order => get detail Order', async () => {
      const orderFirst: any = {
        userId: 1,
        orderItems: [
          { product: { productId: "4", productName: "Easy Polo 1", price: 400, imageUrl: '' }, quantity: 2 },
          { product: { productId: "3", productName: "Easy Polo 2", price: 300, imageUrl: '' }, quantity: 1 }
        ],
        totalPrice: 700
      }
      const createdOrder = await ordersController.createOrder(orderFirst);
      const orderDetail = await ordersController.getOrderDetails({ orderId: createdOrder['_id'] });
      expect(createdOrder['_id']).toEqual(orderDetail['_id']);
    })
  })

  describe('Cancel Order', () => {
    it('cancel order => update Status => Canceled', async () => {
      const orderFirst: any = {
        userId: 1,
        orderItems: [
          { product: { productId: "4", productName: "Easy Polo 1", price: 400, imageUrl: '' }, quantity: 2 },
          { product: { productId: "3", productName: "Easy Polo 2", price: 300, imageUrl: '' }, quantity: 1 }
        ],
        totalPrice: 700
      }
      const createdOrder = await ordersController.createOrder(orderFirst);
      if (createdOrder && (createdOrder.orderStatus === ORDER_STATUS.CONFIRMED || createdOrder.orderStatus === ORDER_STATUS.CREATED)) {
        await ordersController.cancelOrder({ orderId: createdOrder['_id'] });
        const canceledOrder = await ordersController.getOrderDetails({ orderId: createdOrder['_id'] });
        expect(canceledOrder.orderStatus).toEqual(ORDER_STATUS.CANCELED);
      }
    })
  })
});
