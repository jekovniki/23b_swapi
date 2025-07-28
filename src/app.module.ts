import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { FilmsModule } from './modules/films/films.module';
import { PlanetsModule } from './modules/planets/planets.module';
import { SpaceshipsModule } from './modules/spaceships/spaceships.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { PeopleModule } from './modules/people/people.module';
import { SpeciesModule } from './modules/species/species.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessGuard } from './shared/guard/access.guard';
import { PermissionGuard } from './shared/guard/permission.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    FilmsModule,
    PlanetsModule,
    SpaceshipsModule,
    VehiclesModule,
    PeopleModule,
    SpeciesModule,
    JobsModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: minutes(1),
        limit: 100,
      },
    ]),
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
