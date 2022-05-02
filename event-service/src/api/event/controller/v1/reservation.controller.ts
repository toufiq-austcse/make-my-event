import { Body, Controller, Post } from '@nestjs/common';
import { CreateReservationReqDto } from './dto/reservation-req.dto';

@Controller('api/v1/reservations')
export class ReservationController {
  @Post()
  async bookSeat(@Body() body: CreateReservationReqDto) {}
}
