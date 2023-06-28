import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete('/:id')
  deleteRecord(@Param('id', ParseIntPipe) id: number) {
    return "record Deleted Successfully with id : "+id;
  }
}
