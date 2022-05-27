import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../common/database/entity/base.entity';
import { Event } from './event.entity';

@Entity({
  name: 'reservations',
})
export class Reservation extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  ref_id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  status: string;

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
  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
