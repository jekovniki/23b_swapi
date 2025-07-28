import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { Token } from './enum/token.enum';
import { getExpirationTime } from './util/auth.util';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/sign-up.dto';
import { RoleService } from './role.service';
import { Public } from '../../shared/decorators/public.decorator';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly roleService: RoleService,
  ) {}

  @Post('/sign-in')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() credentials: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { sessionData, refreshToken, accessToken } =
      await this.authService.signIn(credentials);

    response.cookie(Token.Refresh, refreshToken, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: getExpirationTime.days(30),
    });

    response.cookie(Token.Access, accessToken, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: getExpirationTime.minutes(60),
    });

    return { sessionData };
  }

  @Post('/sign-up')
  @Public()
  async signUp(@Body() credentials: SignUpDto) {
    return await this.authService.signUp(credentials);
  }

  @Get('/role')
  @Public()
  async findAll() {
    return this.roleService.findAll();
  }
}
