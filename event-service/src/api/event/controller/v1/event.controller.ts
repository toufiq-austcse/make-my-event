import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { HostGuard } from '../../../../common/guards/host.guard';
import { ResponseInterceptor } from '../../../../common/interceptors/response.interceptor';
import { EventService } from '../../service/event.service';
import { CreateEventReqDto, UpdateEventReqDto } from './dto/event-req.dto';
import { CreateEventResDto, ListEventResDto, ShowEventResDto, UpdateEventResDto } from './dto/event-res.dto';
import { ResponseDto } from './dto/response.dto';
@ApiTags('Event')
@Controller('api/v1/events')
@UseInterceptors(ResponseInterceptor)
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateEventResDto,
  })
  @ApiSecurity('host-auth')
  @UseGuards(HostGuard)
  async create(@Body() dto: CreateEventReqDto, @Req() req: any): Promise<ResponseDto> {
    let result = await this.eventService.createEvent(dto, req.user.id);
    return {
      message: 'Event Created',
      data: result,
    };
  }


  @Get(':event_id')
  @ApiOkResponse({
    type: ShowEventResDto,
  })
  @ApiSecurity('host-auth')
  @UseGuards(HostGuard)
  async show(@Param('event_id') event_id: number, @Req() req: any): Promise<ResponseDto> {
    let result = await this.eventService.showEvent(event_id, req.user.id);
    return {
      message: 'Event Found',
      data: result,
    };
  }

  @Get()
  @ApiSecurity('host-auth')
  @UseGuards(HostGuard)
  @ApiOkResponse({
    type: ListEventResDto,
  })
  async index(@Req() req: any, @Query('page') page: number): Promise<ResponseDto> {
    page = page ? page : 1;
    let limit = 20;
    let result = await this.eventService.listEventsByHostId(limit, page, req.user.id);
    return {
      message: 'Events Found',
      data: result,
    };
  }

  @Patch(':event_id')
  @ApiSecurity('host-auth')
  @UseGuards(HostGuard)
  @ApiOkResponse({
    type: UpdateEventResDto,
  })
  async update(@Req() req: any, @Param('event_id') eventId: number, @Body() dto: UpdateEventReqDto) {
    let result = await this.eventService.updateEvent(eventId, dto, req.user.id);
    return {
      message: 'Event Updated',
      data: result,
    };
  }
}
