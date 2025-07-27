import { Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PlanetsService } from '../planets/planets.service';
import { PeopleService } from '../people/people.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    private readonly filmService: FilmsService,
    private readonly planetService: PlanetsService,
    private readonly peopleService: PeopleService,
  ) {}

  async findAll(queryParams: PaginationDto) {
    const { limit = 10, offset = 0 } = queryParams;
    const currentPage = Math.floor(offset / limit) + 1;

    const [data, total] = await this.speciesRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['films', 'people'],
    });
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      limit,
      offset,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
    };
  }

  async findById(id: number) {
    return this.speciesRepository.findOne({
      where: {
        id,
      },
      relations: ['films', 'people'],
    });
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
