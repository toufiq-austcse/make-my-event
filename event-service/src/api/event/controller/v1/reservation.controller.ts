import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ReservationService } from '../../service/reservation.service';
import { CreateReservationReqDto } from './dto/reservation-req.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { CreateReservationResDto } from './dto/reservation-res.dto';

@ApiTags('Reservation')
@Controller('api/v1/reservations')
@UseInterceptors(ResponseInterceptor)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateReservationResDto })
  async createReservation(@Body() body: CreateReservationReqDto) {
    let result = await this.reservationService.createReservation(body);
    return {
      message: 'Reservation created',
      data: result,
    };
  }
}
