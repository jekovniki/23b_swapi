import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spaceship } from './entities/spaceship.entity';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { CreateSpaceshipDto } from './dto/create-spaceship.dto';

@Injectable()
export class SpaceshipsService {
  constructor(
    @InjectRepository(Spaceship)
    private readonly spaceshipRepository: Repository<Spaceship>,
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {}

  findAll() {
    return `This action returns all spaceships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spaceship`;
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
