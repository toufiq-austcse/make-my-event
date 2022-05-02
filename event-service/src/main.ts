import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';


async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const PORT =process.env.PORT?process.env.PORT:3001
  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
