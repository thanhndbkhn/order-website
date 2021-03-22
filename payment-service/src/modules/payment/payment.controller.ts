import { Controller, Logger } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class PaymentController {
  private logger = new Logger('AppController');
  constructor(private paymentService: PaymentService) {}

  @MessagePattern('verify')
  // Define the logic to be executed
  async verifyPayment(createdOrder : any)  {
    return this.paymentService.verifyPayment(createdOrder); // use math service to calc result & return
  }
}
