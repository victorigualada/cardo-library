import { Module } from '@nestjs/common';
import { ConfigModule } from '../core/config/config.module';
import { AuthService, UserService } from './service';
import { AuthController, UserController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from './strategies';
import { ConfigService } from '../core/config/services/config.service';
import { User } from './entity/user.entity';

@Module({
  controllers: [
    UserController,
    AuthController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: (config: ConfigService) => config.jwtConfig,
      inject: [
        ConfigService,
      ],
    }),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
  ],
  exports: [
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AdministrationModule {}
