import { Controller, Get, Post, Body, Put, UsePipes, ValidationPipe, Param, Query } from '@nestjs/common';
import { ORDER_STATUS } from './constants/orders.constants';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/orderResponseDto';
import { Order } from 'src/modules/orders/interfaces/order.interface';

@Controller('orders')
export class OrdersController {

  constructor(private ordersService: OrdersService) {
  }

  @ApiOkResponse({
    type: OrderResponseDto,
    description: 'List of order for signed in user',
    isArray: true
  })
  @Get('')
  @ApiQuery({ name: 'userId', type: 'string' })
  @ApiQuery({ name: 'limit', type: 'string' })
  @ApiQuery({ name: 'offset', type: 'string' })
  async getOrderList(@Query() query): Promise<Order[]> {
    return this.ordersService.getOrderList(parseInt(query.userId), parseInt(query.limit), parseInt(query.offset));
  }

  @Get('/:orderId')
  @ApiParam({ name: 'orderId', type: 'string' })
  @ApiOkResponse({
    type: OrderResponseDto,
    description: 'Get detail order',
  })
  async getOrderDetails(@Param() param): Promise<Order> {
    return this.ordersService.getOrderDetails(param.orderId);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('')
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({
    type: OrderResponseDto,
    description: 'Create order'
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Put('/:orderId/cancel')
  @ApiParam({ name: 'orderId', type: 'string' })
  @ApiCreatedResponse({
    type: OrderResponseDto,
    description: 'cancel Order'
  })
  async cancelOrder(@Param() param): Promise<Order> {
    return this.ordersService.updateOrderStatus(param.orderId, ORDER_STATUS.CANCELED);
  }
}