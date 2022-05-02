import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../entity/event.entity';
import { paginate } from 'nestjs-typeorm-paginate';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  getEventsByHostId(limit: number, page: number, hostId: string) {
    let queryBuilder = this.createQueryBuilder('event')
      .andWhere('event.host_id = :hostId', { hostId: hostId })
      .orderBy('event.createdAt', 'DESC');
    return paginate(queryBuilder, { page: page, limit:limit });
  }
}
