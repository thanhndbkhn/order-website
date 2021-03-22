import { Injectable } from '@nestjs/common';
import { PAYMENT_STATUS } from './payment.constants';

@Injectable()
export class PaymentService {
  public verifyPayment(createdOrder: any): number {
    // have to check createdOrder => payment completed yet
    const randomNumber = Math.round(Math.random())
    if(randomNumber === PAYMENT_STATUS.CONFIRMED) {
      return PAYMENT_STATUS.CONFIRMED;
    } else {
      return PAYMENT_STATUS.DECLINED;
    }
  }
}