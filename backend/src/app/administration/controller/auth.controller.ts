import { Body, ClassSerializerInterceptor, Controller, Get, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, UserService } from '../service';
import { User } from '../entity/user.entity';
import { JwtGuard } from '../../core/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async me(@Request() req: any) {
    return this.userService.getUserProfile(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sign-up')
  async signUp(@Body() user: User) {
    return this.userService.signUp(user);
  }
}
