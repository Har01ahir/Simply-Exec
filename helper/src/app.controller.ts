import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/contract/create-contract')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello() {
    this.appService.getHello();
  }
}
