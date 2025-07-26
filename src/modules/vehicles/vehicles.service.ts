import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {}

  findAll() {
    return `This action returns all vehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
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
