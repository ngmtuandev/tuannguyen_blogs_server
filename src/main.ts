import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  console.log('DB_PASSWORD from env:', process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD); 

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blogs TuanNguyen Service API')
    .setDescription('TuanNguyen Service API')
    .setVersion('1.0')
    .addTag('TuanNguyenBlog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('tuan-nguyen-blogs/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
      },
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
