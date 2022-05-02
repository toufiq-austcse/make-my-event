import { Controller } from "@nestjs/common";
import { EventService } from '../../service/event.service';

@Controller('api/va/events')
export class EventController{
        constructor(private eventService:EventService){}
}