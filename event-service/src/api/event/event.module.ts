import { EventRepository } from './repository/event.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './repository/post.repository';
import { VisitorRepository } from './repository/vistior.repository';
import { VisitorService } from './service/visitor.service';
import { EventService } from './service/event.service';
import { PostService } from './service/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository, PostRepository, VisitorRepository])],
  providers: [VisitorService, EventService, PostService],
})
export class EventModule {}
