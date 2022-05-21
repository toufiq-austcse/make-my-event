import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { EventModule } from './event/event.module';
import { DatabaseModule } from '../common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/common/http-clients/auth/auth.module';

@Module({
  imports: [
    IndexModule,
    EventModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
