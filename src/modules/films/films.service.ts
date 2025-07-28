import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { SortOrder } from 'src/shared/enum/basic.enum';
import { FilmSortableFields } from './enum/film.enum';
import { FilmSortingDto } from './dto/film-sorting.dto';
import { Filtering } from 'src/shared/interface/basic.interface';
import { getWhere } from 'src/shared/utils/helpers.util';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async findAll(
    paginationParams: PaginationDto,
    sortingParams: FilmSortingDto,
    filters?: Filtering[],
  ) {
    const { limit = 10, offset = 0 } = paginationParams;
    const { order = SortOrder.Ascending, sortBy = FilmSortableFields.ID } =
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

    const [data, total] = await this.filmRepository.findAndCount({
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
    return this.filmRepository.findOne({
      where: {
        id,
      },
      relations: ['characters', 'planets', 'starships', 'vehicles', 'species'],
    });
  }

  async upsert(inputs: CreateFilmDto[]): Promise<void> {
    await this.filmRepository.upsert(inputs, {
      conflictPaths: ['swapiUrl'],
      skipUpdateIfNoValuesChanged: true,
    });
  }

  async findByUrl(urls: string[]): Promise<Film[] | null> {
    return await this.filmRepository.find({
      where: {
        swapiUrl: In(urls),
      },
    });
  }
}
