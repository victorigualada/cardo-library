import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../core/payloads/jwt-payload';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService,
              private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User | any> {
    const user = await this.userService.findOneByUsernameAuth(username);
    const passwordIsCorrect = async () =>  await bcrypt.compare(pass, user.password);
    if (user && await passwordIsCorrect()) {
      const { password, ...result } = user;
      return result;
    }
    return undefined;
  }

  async login(user: User): Promise<{
    access_token: string,
  }> {
    const foundUser: User = await this.userService.findOneByUsernameAuth(user.username);
    if (!!foundUser) {
      const payload: JwtPayload = { username: foundUser.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async validatePayload(payload: JwtPayload): Promise<User> {
    return await this.userService.findOneByUsernameAuth(payload.username);
  }
}
