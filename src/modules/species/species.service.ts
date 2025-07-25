import { Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PlanetsService } from '../planets/planets.service';
import { PeopleService } from '../people/people.service';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    private readonly filmService: FilmsService,
    private readonly planetService: PlanetsService,
    private readonly peopleService: PeopleService,
  ) {}

  findAll() {
    return `This action returns all species`;
  }

  findOne(id: number) {
    return `This action returns a #${id} species`;
  }

  async insertMany(inputs: CreateSpeciesDto[]): Promise<void> {
    for (const input of inputs) {
      const { films, people, ...speciesData } = input;
      const species = this.speciesRepository.create(speciesData);

      if (films && films?.length) {
        const filmsData = await this.filmService.findByUrl(films);
        species.films = filmsData || [];
      }
      if (people && people?.length) {
        const peopleData = await this.peopleService.findByUrls(people);
        species.people = peopleData || [];
      }
      species.homeworld = await this.planetService.findByUrl(
        speciesData.homeworldUrl,
      );

      await this.speciesRepository.save(species);
    }
  }
}
