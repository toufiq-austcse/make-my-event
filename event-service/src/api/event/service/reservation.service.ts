import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import {CreateReservationReqDto} from '../dto/reservation-req.dto';
import {EventRepository} from '../repository/event.repository';
import {ReservationRepository} from '../repository/reservation.repository';
import {customAlphabet} from 'nanoid';
import {RESERVATION_STATUS} from '@common/utils/reservation-status';
import {DataSource} from 'typeorm';
import {Event} from '../entity/event.entity';
import {Reservation} from '../entity/reservation.entity';
import {MailgunService} from "@common/http-clients/services/mailgun.service";
import {RabbitMqService} from "@common/rabbit-mq/service/rabbitmq.service";
import {ConfigService} from "@nestjs/config";
import {ReservationConfirmationEventDto} from "../dto/queue.dto";

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);

@Injectable()
export class ReservationService {
    constructor(
        private repository: ReservationRepository,
        private eventRepository: EventRepository,
        private dataSource: DataSource,
        private mailgunService: MailgunService,
        private rabbitMqService: RabbitMqService,
        private configService: ConfigService
    ) {
    }

    async createReservation(dto: CreateReservationReqDto) {
        let {email, name, event_id, phone} = dto;

        return this.dataSource.transaction(async (transactionManager) => {
            let event = await transactionManager.findOne(Event, {
                where: {
                    id: +event_id,
                },
            });
            if (!event) {
                throw new NotFoundException('Event Not Found');
            }
            if (event.no_of_seats_booked === event.total_no_of_seats) {
                throw new NotAcceptableException('No seats available');
            }
            let oldReservation = await transactionManager.findOne(Reservation, {
                where: [{email}, {phone}],
            });
            if (oldReservation) {
                throw new NotAcceptableException('a reservation already exists for this email and phone');
            }
            let newReservation = await transactionManager.create(Reservation, {
                email: email,
                name: name,
                event: event,
                ref_id: nanoid(8),
                status: RESERVATION_STATUS.CONFIRMED,
                ticket_link: null,
                phone: phone,
            });
            await transactionManager.save(Reservation, newReservation);
            let updatedEvent = await transactionManager.save(Event, {
                ...event,
                no_of_seats_booked: event.no_of_seats_booked + 1,
            });
            this.publishReservationConfirmationMessageToQueue({
                event: {
                    name: event.name,
                    id: event.id.toString()
                },
                email: email,
                name: name,
                phone: phone,
                reservation_ref_id: newReservation.ref_id,
                ticket_link: newReservation.ticket_link
            })

            return {
                reservation_ref_id: newReservation.ref_id,
                status: newReservation.status,
            };
        });
    }

    async publishReservationConfirmationMessageToQueue(data: ReservationConfirmationEventDto) {
        this.rabbitMqService.publish(this.configService.get('RABBIT_MQ_MAKE_MY_EVENT_EXCHANGE'),
            this.configService.get('RABBIT_MQ_RESERVATION_CONFORMATION_ROUTING_KEY'), data)
    }
}
