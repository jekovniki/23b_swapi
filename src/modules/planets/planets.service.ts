import { Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    private readonly filmService: FilmsService,
  ) {}

  async findAll(queryParams: PaginationDto) {
    const { limit = 10, offset = 0 } = queryParams;
    const currentPage = Math.floor(offset / limit) + 1;

    const [data, total] = await this.planetRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['films', 'residents'],
    });
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      data,
      limit,
      offset,
    };
  }

  async findById(id: number) {
    return this.planetRepository.findOne({
      where: {
        id,
      },
      relations: ['films', 'residents'],
    });
  }

  async findByUrl(url: string): Promise<Planet> {
    // fix this
    return (await this.planetRepository.findOneBy({
      swapiUrl: url,
    })) as Planet;
  }

  async insertMany(inputs: CreatePlanetDto[]): Promise<void> {
    for (const input of inputs) {
      const { films, ...planetData } = input;
      /* @todo : fix the types here,make sure that type is inherited properly and you don't need to make
      this sort of gymnastics */
      const planet = this.planetRepository.create({
        ...planetData,
        population: planetData?.population || undefined,
      });

      if (films && films?.length > 0) {
        const filmsData = await this.filmService.findByUrl(films);
        planet.films = filmsData || [];
      }

      await this.planetRepository.save(planet);
    }
  }
}
