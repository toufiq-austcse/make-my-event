import { EntityRepository, Repository } from "typeorm";
import { Reservation } from '../entity/reservation.entity';

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation>{
        
}