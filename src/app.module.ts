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
import { APP_GUARD } from '@nestjs/core';

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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
