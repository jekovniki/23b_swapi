import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async findAll(queryParams: PaginationDto) {
    const { limit = 10, offset = 0 } = queryParams;
    const currentPage = Math.floor(offset / limit) + 1;

    const [data, total] = await this.filmRepository.findAndCount({
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
