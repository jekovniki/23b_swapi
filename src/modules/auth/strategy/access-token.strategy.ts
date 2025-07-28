import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../enum/token.enum';
import { Request } from 'express';
import { AccessTokenPayload, UserData } from '../types/auth.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access') {
  private readonly configService: ConfigService;
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: (request) => {
        if (request && request.headers && request.headers.cookie) {
          const cookies = this.parseCookies(request.headers.cookie);
          console.log('hello');
          console.log(cookies[Token.Access]);
          return cookies[Token.Access];
        }

        return null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      passReqToCallback: true,
    });
    this.configService = configService;
  }

  public validate(req: Request): UserData {
    const cookies = req?.headers?.cookie
      ? this.parseCookies(req.headers.cookie)
      : {};

    const token = cookies[Token.Access];

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload: AccessTokenPayload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      });

      return {
        id: payload.sub,
        permissions: payload.scope,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  private parseCookies(cookieHeader: string): { [key: string]: string } {
    const list: { [key: string]: string } = {};
    cookieHeader.split(';').forEach((cookie) => {
      // eslint-disable-next-line prefer-const
      let [name, ...rest] = cookie.split('=');
      name = name?.trim();
      if (!name) return;
      const value = rest.join('=').trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
    });
    return list;
  }
}
