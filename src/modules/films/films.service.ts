import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { In, Repository } from 'typeorm';

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

  async findByUrl(urls: string[]): Promise<Film[] | null> {
    return await this.filmRepository.find({
      where: {
        swapiUrl: In(urls),
      },
    });
  }
}
