import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationResDto {
  @ApiProperty({
    default: 201,
  })
  status: number;

  @ApiProperty({
    default: 'Reservation created',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  errors: string[];

  @ApiProperty({
    default: {
      reservation_ref_id: 'LrIBMRFL',
      status: 'CONFIRMED',
    },
  })
  data: any;
}
