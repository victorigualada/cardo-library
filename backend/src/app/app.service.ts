import { Injectable } from '@nestjs/common';
import { ConfigService } from './core/config/services/config.service';
import { Info } from './core/shared/entities/info';

@Injectable()
export class AppService {

  constructor(private readonly configService: ConfigService) { }

  getAPIInfo(): Info {
    return {
      version: this.configService.version,
    };
  }
}
