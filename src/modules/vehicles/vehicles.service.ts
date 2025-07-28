import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { VehiclesSortingDto } from './dto/vehicles-sorting.dto';
import { Filtering } from 'src/shared/interface/basic.interface';
import { SortOrder } from 'src/shared/enum/basic.enum';
import { VehiclesSortableFields } from './enum/vehicles.enum';
import { getWhere } from 'src/shared/utils/helpers.util';
@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {}

  async findAll(
    paginationParams: PaginationDto,
    sortingParams: VehiclesSortingDto,
    filters?: Filtering[],
  ) {
    const { limit = 10, offset = 0 } = paginationParams;
    const { order = SortOrder.Ascending, sortBy = VehiclesSortableFields.ID } =
      sortingParams;
    const currentPage = Math.floor(offset / limit) + 1;
    let where = {};
    if (filters && filters?.length) {
      where = filters.reduce((acc, filter) => {
        const filterWhere = getWhere(filter);
        return { ...acc, ...filterWhere };
      }, {});
    }
    const orderBy: Record<string, 'ASC' | 'DESC'> = {};
    orderBy[sortBy] = order.toUpperCase() as 'ASC' | 'DESC';

    const [data, total] = await this.vehicleRepository.findAndCount({
      where,
      order: orderBy,
      take: limit,
      skip: offset,
      relations: ['films', 'pilots'],
    });
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      limit,
      offset,
      data,
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

  async upsert(inputs: CreateVehicleDto[]): Promise<void> {
    const vehicles = [];
    for (const input of inputs) {
      const { films, pilots, ...speciesData } = input;
      const vehicle = this.vehicleRepository.create(speciesData);

      if (films && films?.length) {
        const filmsData = await this.filmService.findByUrl(films);
        vehicle.films = filmsData || [];
      }
      if (pilots && pilots?.length) {
        const peopleData = await this.peopleService.findByUrls(pilots);
        vehicle.pilots = peopleData || [];
      }
      vehicles.push(vehicle);
    }

    await this.vehicleRepository.upsert(vehicles, {
      conflictPaths: ['swapiUrl'],
      skipUpdateIfNoValuesChanged: true,
    });
  }
}
