import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async insertMany(inputs: CreateFilmDto[]): Promise<Film[]> {
    const films = this.filmRepository.create(inputs);
    return await this.filmRepository.save(films);
  }
}
