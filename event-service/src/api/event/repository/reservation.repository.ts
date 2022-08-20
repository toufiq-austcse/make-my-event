import {Repository} from "typeorm";
import {Reservation} from '../entity/reservation.entity';
import {Injectable} from "@nestjs/common";

@Injectable()
export class ReservationRepository extends Repository<Reservation> {

}