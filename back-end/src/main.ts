import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as history from 'connect-history-api-fallback';
import * as path from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(history());
  app.enableCors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(express.static(path.join(__dirname, '..', 'frontend')));
  await app.listen(3000);
}
bootstrap();