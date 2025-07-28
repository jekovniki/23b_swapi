import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';
import { AccessTokenStrategy } from './strategy/access-token.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Permission, Role]),
  ],
  controllers: [AuthController],
  providers: [AuthService, RoleService, AccessTokenStrategy],
})
export class AuthModule {}
