import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
