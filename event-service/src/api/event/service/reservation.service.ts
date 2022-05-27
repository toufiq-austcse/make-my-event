import { Injectable, NotAcceptableException, NotFoundException, Logger } from '@nestjs/common';
import { CreateReservationReqDto } from '../controller/v1/dto/reservation-req.dto';
import { EventRepository } from '../repository/event.repository';
import { ReservationRepository } from '../repository/reservation.repository';
import { customAlphabet } from 'nanoid';
import { RESERVATION_STATUS } from '../../../common/utils/reservation-status';
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);

@Injectable()
export class ReservationService {
  constructor(private repository: ReservationRepository, private eventRepository: EventRepository) {}

  async createReservation(dto: CreateReservationReqDto) {
    let { email, name, event_id, phone } = dto;
    let event = await this.eventRepository.findOne({
      where: {
        id: event_id,
      },
    });
    if (!event) {
      throw new NotFoundException('Event Not Found');
    }
    if (event.no_of_seats_booked === event.total_no_of_seats) {
      throw new NotAcceptableException('No seats available');
    }
    let oldReservation = await this.repository.findOne({
      where: [
        {email},
        {phone},
      ],
    });
    if(oldReservation){
      throw new NotAcceptableException('a reservation already exists for this email and phone');
    }
    let newReservation = await this.repository.create({
      email: email,
      name: name,
      event: event,
      ref_id: nanoid(8),
      status: RESERVATION_STATUS.CONFIRMED,
      ticket_link: null,
      phone: phone,
    });
    await this.repository.save(newReservation);
    let updatedEvent = await this.eventRepository.save({ ...event, no_of_seats_booked: event.no_of_seats_booked + 1 });
    console.log('updated event ', updatedEvent);

    if (event.has_tickets) {
      Logger.log('Sent for ticket generation');
    }
    return {
      reservation_ref_id: newReservation.ref_id,
      status: newReservation.status,
    };
  }
}
