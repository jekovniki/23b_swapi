import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindPlanetDto } from './dto/find-planet.dto';
import { FilteringParams } from 'src/shared/decorators/filtering-params.decorator';
import { Filtering } from 'src/shared/interface/basic.interface';
import { PlanetsSortingDto } from './dto/planets-sorting.dto';

@Controller({
  path: 'planets',
  version: '1',
})
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  findAll(
    @Query() queryParams: PaginationDto & PlanetsSortingDto,
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
    filters?: Filtering,
  ) {
    return this.planetsService.findAll(queryParams, filters);
  }

  @Get(':id')
  findOne(@Param() params: FindPlanetDto) {
    return this.planetsService.findById(params.id);
  }
}
