import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spaceship } from './entities/spaceship.entity';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { CreateSpaceshipDto } from './dto/create-spaceship.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Filtering } from 'src/shared/interface/basic.interface';
import { SortOrder } from 'src/shared/enum/basic.enum';
import { SpaceshipsSortableFields } from './enum/spaceships.enum';
import { getWhere } from 'src/shared/utils/helpers.util';
import { SpaceshipsSortingDto } from './dto/spaceship-sorting.dto';

@Injectable()
export class SpaceshipsService {
  constructor(
    @InjectRepository(Spaceship)
    private readonly spaceshipRepository: Repository<Spaceship>,
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {}

  async findAll(
    queryParams: PaginationDto & SpaceshipsSortingDto,
    filters?: Filtering[],
  ) {
    let where = {};
    if (filters && filters?.length) {
      where = filters.reduce((acc, filter) => {
        const filterWhere = getWhere(filter);
        return { ...acc, ...filterWhere };
      }, {});
    }
    const {
      limit = 10,
      offset = 0,
      order = SortOrder.Ascending,
      sortBy = SpaceshipsSortableFields.ID,
    } = queryParams;
    const currentPage = Math.floor(offset / limit) + 1;

    const orderBy: Record<string, 'ASC' | 'DESC'> = {};
    orderBy[sortBy] = order.toUpperCase() as 'ASC' | 'DESC';

    const [data, total] = await this.spaceshipRepository.findAndCount({
      where,
      order: orderBy,
      take: limit,
      skip: offset,
      relations: ['films', 'pilots'],
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
    return this.spaceshipRepository.findOne({
      where: {
        id,
      },
      relations: ['films', 'pilots'],
    });
  }

  async insertMany(inputs: CreateSpaceshipDto[]): Promise<void> {
    for (const input of inputs) {
      const { films, pilots, ...starshipData } = input;
      const starships = this.spaceshipRepository.create(starshipData);

      if (films && films?.length) {
        const filmsData = await this.filmService.findByUrl(films);
        starships.films = filmsData || [];
      }
      if (pilots && pilots?.length) {
        const peopleData = await this.peopleService.findByUrls(pilots);
        starships.pilots = peopleData || [];
      }

      await this.spaceshipRepository.save(starships);
    }
  }
}
