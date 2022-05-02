import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { EventModule } from './event/event.module';
import { DatabaseModule } from '../common/database/database.module';


@Module({
  imports: [IndexModule, EventModule,DatabaseModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
