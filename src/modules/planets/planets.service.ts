import { Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    private readonly filmService: FilmsService,
  ) {}
  findAll() {
    return `This action returns all planets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planet`;
  }

  async insertMany(inputs: CreatePlanetDto[]): Promise<Planet[]> {
    const savedPlanets: Planet[] = [];

    for (const input of inputs) {
      const { films, ...planetData } = input;
      /* @todo : fix the types here,make sure that type is inherited properly */
      const planet = this.planetRepository.create({
        ...planetData,
        population: planetData?.population || undefined,
      });

      if (films && films?.length > 0) {
        const filmsData = await this.filmService.findByUrl(films);
        planet.films = filmsData || [];
      }

      const savedPlanet = await this.planetRepository.save(planet);
      savedPlanets.push(savedPlanet);
    }

    return savedPlanets;
  }
}
