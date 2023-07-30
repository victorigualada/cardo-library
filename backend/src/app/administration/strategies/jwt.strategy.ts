import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../service';
import { ConfigService } from '../../core/config/services/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly configService: ConfigService,
    private readonly authService: AuthService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtConfig.secret,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validatePayload(payload);
    return !user ?
      done(new HttpException({}, HttpStatus.UNAUTHORIZED), false) :
      done(null, user, payload.iat);
  }
}
