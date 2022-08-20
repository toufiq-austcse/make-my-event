import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {AppBaseEntity} from '../../../common/database/entity/base.entity';

@Entity({
    name: 'events',
})
export class Event extends AppBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
    })
    short_id: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    name: string;
    @Column({
        type: 'text',
        default: null,
    })
    location: string;
    @Column({
        default: false,
    })
    has_tickets: boolean;
    @Column({
        default: 0,
    })
    total_no_of_seats: number;

    @Column({
        default: 0,
    })
    no_of_seats_booked: number;

    @Column({
        type: 'text',
        default: null,
    })
    description: string;

    @Column({
        default: null,
    })
    start_at: Date;

    @Column({
        default: null,
    })
    end_at: Date;

    @Column({
        nullable: false,
    })
    host_id: string;
}
