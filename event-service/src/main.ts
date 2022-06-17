require('dotenv').config({
  path: process.env.ENV_PATH
});

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api/api.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';



function setupSwagger(app) {
  // Swagger Set up

  let swaggerDocPath = '/api-doc';
  const config = new DocumentBuilder()
    .setTitle('Event Service')
    .setDescription('API DOC')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'Authorization', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer' },
      'host-auth'
    )
    .addServer('http://localhost:3001/', 'localhost')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerDocPath, app, document, {
    swaggerOptions: { persistAuthorization: true, ignoreGlobalPrefix: true },
  });

  // Swagger Setup End
}
async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  setupSwagger(app);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    })
  );
  const PORT = process.env.PORT ? process.env.PORT : 3001;
  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
