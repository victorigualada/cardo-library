import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Info } from './core/shared/entities/info';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation( { summary: 'Retrieve API info' })
  global(): Info {
    return this.appService.getAPIInfo();
  }
}
