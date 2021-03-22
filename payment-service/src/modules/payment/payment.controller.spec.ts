import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PAYMENT_STATUS } from './payment.constants';

describe('PaymentController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    }).compile();
  });

  describe('verifyPayment', () => {
    it('should return value order payment yet?', async () => {
      const paymentController = app.get<PaymentController>(PaymentController);
      const valuePayment = await paymentController.verifyPayment({});
      const isStatusValid = Object.values(PAYMENT_STATUS).some(
        (stt) => stt === valuePayment,
      );
      expect(isStatusValid).toEqual(true);
    });
  });
});
