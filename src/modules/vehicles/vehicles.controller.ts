import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { FindVehicleDto } from './dto/find-vehicle.dto';
import { VehiclesSortingDto } from './dto/vehicles-sorting.dto';
import { FilteringParams } from '../../shared/decorators/filtering-params.decorator';
import { Filtering } from '../../shared/interface/basic.interface';
import { Permission } from '../../shared/decorators/permission.decorator';

@Controller({
  path: 'vehicles',
  version: '1',
})
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @Permission('vehicles:READ')
  findAll(
    @Query() paginationParams: PaginationDto,
    @Query() sortingParams: VehiclesSortingDto,
    @FilteringParams([
      'id',
      'name',
      'model',
      'manufacturer',
      'costInCredits',
      'length',
      'maxAtmospheringSpeed',
      'crew',
      'passengers',
      'cargoCapacity',
      'consumables',
      'vehicleClass',
    ])
    filters?: Filtering[],
  ) {
    return this.vehiclesService.findAll(
      paginationParams,
      sortingParams,
      filters,
    );
  }

  @Get(':id')
  @Permission('vehicles:READ')
  findOne(@Param() params: FindVehicleDto) {
    return this.vehiclesService.findById(params.id);
  }
}
