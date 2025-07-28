import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { getExpirationTime, hashData, validateHash } from './util/auth.util';
import { SessionDataResponse } from './types/auth.type';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(input: SignInDto): Promise<SessionDataResponse> {
    const user = await this.userService.findOneByUsername(input.email);
    if (!user || !user.password) {
      throw new BadRequestException('Invalid credentials');
    }
    const isValidPassword = await validateHash(input.password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    return await this.getSessionData(user);
  }

  async signUp(input: SignUpDto) {
    const user = await this.userService.findOneByUsername(input.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    console.log(user);
    await this.userService.create({
      ...input,
      password: await hashData(input.password, this.configService),
    });
  }

  private async getSessionData(user: User): Promise<SessionDataResponse> {
    const permissions = user.role.permissions.map(
      (permission) => `${permission.feature}:${permission.permission}`,
    );

    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        role: user.role.name,
        scope: permissions,
        iat: Math.floor(Date.now() / 1000),
      },
      {
        expiresIn: getExpirationTime.minutes(60),
        secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
        iat: Math.floor(Date.now() / 1000),
      },
      {
        expiresIn: getExpirationTime.days(7),
        secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
      },
    );

    await this.userService.updateRefreshToken(user.id, refreshToken);
    return {
      sessionData: Buffer.from(
        JSON.stringify({
          email: user.username,
          createdAt: user.createdAt,
          permissions,
          role: user.role.name,
        }),
        'utf-8',
      ).toString('base64'),
      accessToken: accessToken,
      refreshToken,
    };
  }
}
