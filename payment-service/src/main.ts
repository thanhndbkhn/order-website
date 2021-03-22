import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

// Create micro service options
const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.MICROSERVICES_HOST,
    port: parseInt(process.env.MICROSERVICES_PORT_PAYMENT)
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions);
  app.listen(() => {
    console.log('Payment microservice is listening');
  });
}
bootstrap();
