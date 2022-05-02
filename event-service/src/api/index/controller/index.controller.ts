import { Controller, Get } from '@nestjs/common';

@Controller('')
export class IndexController {
  @Get()
  index() {
    return {
      message: 'Event Service is running',
    };
  }
}
