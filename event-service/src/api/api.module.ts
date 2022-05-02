import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { EventModule } from './event/event.module';
import { DatabaseModule } from '../common/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    IndexModule,
    EventModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
