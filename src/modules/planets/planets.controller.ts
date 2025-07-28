import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { FindPlanetDto } from './dto/find-planet.dto';
import { FilteringParams } from '../../shared/decorators/filtering-params.decorator';
import { Filtering } from '../../shared/interface/basic.interface';
import { PlanetsSortingDto } from './dto/planets-sorting.dto';
import { Permission } from '../../shared/decorators/permission.decorator';

@Controller({
  path: 'planets',
  version: '1',
})
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @Permission('planets:READ')
  findAll(
    @Query() paginationParams: PaginationDto,
    @Query() sortingParams: PlanetsSortingDto,
    @FilteringParams([
      'name',
      'rotationPeriod',
      'orbitalPeriod',
      'diameter',
      'climate',
      'gravity',
      'terrain',
      'surfaceWater',
      'population',
    ])
    filters?: Filtering[],
  ) {
    return this.planetsService.findAll(
      paginationParams,
      sortingParams,
      filters,
    );
  }

  @Get(':id')
  @Permission('planets:READ')
  findOne(@Param() params: FindPlanetDto) {
    return this.planetsService.findById(params.id);
  }
}
