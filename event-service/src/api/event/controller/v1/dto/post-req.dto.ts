import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl, IsNumber } from 'class-validator';

export class CreatePostReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  event_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  image_link: string;
}


export class UpdatePostReqDto {
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  body: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  image_link: string;
}
