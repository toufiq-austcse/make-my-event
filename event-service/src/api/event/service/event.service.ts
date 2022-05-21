import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventReqDto, UpdateEventReqDto } from '../controller/v1/dto/event-req.dto';
import { EventRepository } from './../repository/event.repository';
import { nanoid } from 'nanoid'
@Injectable()
export class EventService {
  constructor(private repository: EventRepository) {}

  async createEvent(dto: CreateEventReqDto, hostId: string) {
    let newEvent = await this.repository.create({
      ...dto,
      short_id:nanoid(7),
      host_id: hostId,
      
    });
    return this.repository.save(newEvent);
  }

  async showEvent(event_id: number, hostId: string) {
    let event = await this.repository.findOne({
      where: {
        id: event_id,
        host_id: hostId,
      },
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
  async listEventsByHostId(limit: number, page: number, hostId: string) {
    let { items, meta } = await this.repository.getEventsByHostId(limit, page, hostId);
    return {
      events: items,
      meta: meta,
    };
  }

  async updateEvent(eventId: number, dto: UpdateEventReqDto, hostId: string) {
    let event = await this.repository.findOne({ where: { id: eventId, host_id: hostId } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    let updatedEvent = await this.repository.save({ ...event, ...dto });
    return updatedEvent;
  }
}
