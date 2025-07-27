import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spaceship } from './entities/spaceship.entity';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { CreateSpaceshipDto } from './dto/create-spaceship.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class SpaceshipsService {
  constructor(
    @InjectRepository(Spaceship)
    private readonly spaceshipRepository: Repository<Spaceship>,
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {}

  async findAll(queryParams: PaginationDto) {
    const { limit = 10, offset = 0 } = queryParams;
    const currentPage = Math.floor(offset / limit) + 1;

    const [data, total] = await this.spaceshipRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['films', 'pilots'],
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
