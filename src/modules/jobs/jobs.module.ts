import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { SwapiSyncService } from './swapi-sync.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpaceshipsModule } from '../spaceships/spaceships.module';
import { SpeciesModule } from '../species/species.module';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    PeopleModule,
    PlanetsModule,
    SpaceshipsModule,
    SpeciesModule,
    VehiclesModule,
  ],
  providers: [JobsService, SwapiSyncService],
  exports: [JobsService, SwapiSyncService],
})
export class JobsModule {}
