import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/contract/create-contract')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }
<<<<<<< Updated upstream
=======

  @Delete('/:id')
  deleteRecord(@Param('id', ParseIntPipe) id: number) {
    return {'message':"record Deleted Successfully with id : "+id};
  }
>>>>>>> Stashed changes
}
