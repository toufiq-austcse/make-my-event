import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppBaseEntity } from '../../../common/database/entity/base.entity';
import { Event } from './event.entity';
@Entity({
  name: 'posts',
})
export class Post extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  body: string;

  @Column({
    type: 'text',
    default: null,
  })
  image_link: string;

  @OneToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
