import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { In, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { FilmsService } from '../films/films.service';
import { PlanetsService } from '../planets/planets.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    private readonly filmService: FilmsService,
    private readonly planetService: PlanetsService,
  ) {}

  async findAll(queryParams: PaginationDto) {
    const { limit = 10, offset = 0 } = queryParams;
    const currentPage = Math.floor(offset / limit) + 1;

    const [data, total] = await this.peopleRepository.findAndCount({
      take: limit,
      skip: offset,
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
    return this.peopleRepository.findOne({
      where: {
        id,
      },
      relations: ['films', 'species', 'vehicles', 'starships'],
    });
  }

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

  async findByUrls(urls: string[]): Promise<Person[] | null> {
    return await this.peopleRepository.find({
      where: {
        swapiUrl: In(urls),
      },
    });
  }
}
