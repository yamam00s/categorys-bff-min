import { Controller, Get } from '@nestjs/common';
import { AppService, PublicItem } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): PublicItem[] {
    return this.appService.getPublicItems();
  }
}
