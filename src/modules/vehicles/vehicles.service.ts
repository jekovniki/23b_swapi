import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {}

  async findAll(queryParams: PaginationDto) {
    const { limit = 10, offset = 0 } = queryParams;
    const currentPage = Math.floor(offset / limit) + 1;

    const [data, total] = await this.vehicleRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['films', 'pilots'],
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
    return this.vehicleRepository.findOne({
      where: {
        id,
      },
      relations: ['films', 'pilots'],
    });
  }

  async insertMany(inputs: CreateVehicleDto[]): Promise<void> {
    for (const input of inputs) {
      const { films, pilots, ...speciesData } = input;
      const species = this.vehicleRepository.create(speciesData);

      if (films && films?.length) {
        const filmsData = await this.filmService.findByUrl(films);
        species.films = filmsData || [];
      }
      if (pilots && pilots?.length) {
        const peopleData = await this.peopleService.findByUrls(pilots);
        species.pilots = peopleData || [];
      }

      await this.vehicleRepository.save(species);
    }
  }
}
