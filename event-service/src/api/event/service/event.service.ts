import { EventRepository } from './../repository/event.repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class EventService {
  constructor(private repository:EventRepository) {}
}