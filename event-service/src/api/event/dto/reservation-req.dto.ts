import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
export class CreateReservationReqDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  event_id: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
}
