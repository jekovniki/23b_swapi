import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from '../films/dto/create-film.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { FilmsService } from '../films/films.service';
import { PlanetsService } from '../planets/planets.service';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    private readonly filmService: FilmsService,
    private readonly planetService: PlanetsService,
  ) {}

  async insertMany(inputs: CreatePersonDto[]): Promise<void> {
    for (const input of inputs) {
      const { films, ...peopleData } = input;
      const person = this.peopleRepository.create(peopleData);

      if (films && films?.length > 0) {
        const filmsData = await this.filmService.findByUrl(films);
        person.films = filmsData || [];
      }
      person.homeworld = await this.planetService.findByUrl(
        peopleData.homeworldUrl,
      );

      await this.peopleRepository.save(person);
    }
  }

  findAll() {
    return [];
  }
}
