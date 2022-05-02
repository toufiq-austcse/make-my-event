import { Inject, Injectable } from '@nestjs/common';
import { ReservationRepository } from '../repository/reservation.repository';

@Injectable()
export class ReservationService {
  constructor(private repository: ReservationRepository) {}
}
