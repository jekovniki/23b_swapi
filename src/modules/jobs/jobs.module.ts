import { Module } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpaceshipsModule } from '../spaceships/spaceships.module';
import { SpeciesModule } from '../species/species.module';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    PeopleModule,
    PlanetsModule,
    SpaceshipsModule,
    SpeciesModule,
    VehiclesModule,
  ],
  providers: [SwapiService],
  exports: [SwapiService],
})
export class JobsModule {}
