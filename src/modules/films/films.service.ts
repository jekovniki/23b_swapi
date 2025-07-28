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
    queryParams: PaginationDto & FilmSortingDto,
    filter?: Filtering,
  ) {
    const {
      limit = 10,
      offset = 0,
      order = SortOrder.Ascending,
      sortBy = FilmSortableFields.ID,
    } = queryParams;
    const where = filter ? getWhere(filter) : {};
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
      data,
      total,
      limit,
      offset,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
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

  async insertMany(inputs: CreateFilmDto[]): Promise<Film[]> {
    const films = this.filmRepository.create(inputs);
    return await this.filmRepository.save(films);
  }

  async findByUrl(urls: string[]): Promise<Film[] | null> {
    return await this.filmRepository.find({
      where: {
        swapiUrl: In(urls),
      },
    });
  }
}
