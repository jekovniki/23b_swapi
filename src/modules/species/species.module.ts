import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { PlanetsModule } from '../planets/planets.module';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [TypeOrmModule.forFeature([Species]), PlanetsModule, PeopleModule],
  controllers: [SpeciesController],
  providers: [SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}
