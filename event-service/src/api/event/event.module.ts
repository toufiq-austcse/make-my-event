import { EventRepository } from './repository/event.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './repository/post.repository';
import { ReservationRepository } from './repository/reservation.repository';
import { ReservationService } from './service/reservation.service';
import { EventService } from './service/event.service';
import { PostService } from './service/post.service';
import { EventController } from './controller/v1/event.controller';
import { PostsController } from './controller/v1/post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository, PostRepository, ReservationRepository])],
  providers: [ReservationService, EventService, PostService],
  controllers:[EventController,PostsController]
})
export class EventModule {}
