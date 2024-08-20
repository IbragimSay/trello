import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  const config = new DocumentBuilder()
  .setTitle("Trello")
  .setDescription("Swagger документация для trello api")
  .setVersion("1.0")
  .addBearerAuth(
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
  },
  "Authorization"
  )
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(5003);
}
bootstrap();
