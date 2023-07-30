import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Override } from '@nestjsx/crud';
import { JwtGuard } from '../../core/guards/auth.guard';
import { User } from '../entity/user.entity';
import { UserService } from '../service';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    public service: UserService,
  ) {}

  @Override()
  @UseInterceptors(ClassSerializerInterceptor)
  async createOne(@Body() user: User): Promise<User> {
    return await this.service.createUser(user);
  }
}
