import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: '*',
    methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE'],
  });
  await app.listen(4000);
}
bootstrap();
