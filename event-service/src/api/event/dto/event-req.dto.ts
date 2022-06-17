import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  has_tickets: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  total_no_of_seats: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  start_at: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  end_at: Date;
}

export class UpdateEventReqDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  location: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  has_tickets: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  total_no_of_seats: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  start_at: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  end_at: Date;
}
