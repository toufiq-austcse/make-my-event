import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, Column } from 'typeorm';
import { AppBaseEntity } from '../../../common/database/entity/base.entity';
import { Event } from './event.entity';

@Entity({
  name: 'visitors',
})
export class Visitor extends AppBaseEntity{
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'text',
    default: null,
  })
  ticket_link: string;
  @OneToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  events: Event;
}
