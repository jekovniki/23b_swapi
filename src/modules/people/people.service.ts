import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from '../films/dto/create-film.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly filmRepository: Repository<Person>,
  ) {}

  async insertMany(inputs: CreateFilmDto[]): Promise<Person[]> {
    const films = this.filmRepository.create(inputs);
    return await this.filmRepository.save(films);
  }

  findAll() {
    return [];
  }
}
