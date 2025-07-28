import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { In, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { FilmsService } from '../films/films.service';
import { PlanetsService } from '../planets/planets.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Filtering } from 'src/shared/interface/basic.interface';
import { getWhere } from 'src/shared/utils/helpers.util';
import { PeopleSortableFields } from './enum/people.enum';
import { SortOrder } from 'src/shared/enum/basic.enum';
import { PeopleSortingDto } from './dto/people-sorting.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    private readonly filmService: FilmsService,
    private readonly planetService: PlanetsService,
  ) {}

  async findAll(
    paginationParams: PaginationDto,
    sortingParams: PeopleSortingDto,
    filters?: Filtering[],
  ) {
    const { limit = 10, offset = 0 } = paginationParams;
    const { order = SortOrder.Ascending, sortBy = PeopleSortableFields.ID } =
      sortingParams;
    let where = {};
    if (filters && filters?.length) {
      where = filters.reduce((acc, filter) => {
        const filterWhere = getWhere(filter);
        return { ...acc, ...filterWhere };
      }, {});
    }
    const currentPage = Math.floor(offset / limit) + 1;

    const orderBy: Record<string, 'ASC' | 'DESC'> = {};
    orderBy[sortBy] = order.toUpperCase() as 'ASC' | 'DESC';

    const [data, total] = await this.peopleRepository.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: orderBy,
    });
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      limit,
      offset,
      data,
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
