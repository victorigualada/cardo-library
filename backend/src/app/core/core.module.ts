import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';

@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  providers: [],
  exports: [
    ConfigModule,
  ],
})
export class CoreModule {}
