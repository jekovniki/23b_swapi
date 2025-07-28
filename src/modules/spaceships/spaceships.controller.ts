import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindSpaceshipDto } from './dto/find-spaceship.dto';
import { SpaceshipsSortingDto } from './dto/spaceship-sorting.dto';
import { FilteringParams } from 'src/shared/decorators/filtering-params.decorator';
import { Filtering } from 'src/shared/interface/basic.interface';

@Controller({
  path: 'spaceships',
  version: '1',
})
export class SpaceshipsController {
  constructor(private readonly spaceshipsService: SpaceshipsService) {}

  @Get()
  findAll(
    @Query() queryParams: PaginationDto & SpaceshipsSortingDto,
    @FilteringParams([
      'name',
      'rotationPeriod',
      'orbitalPeriod',
      'diameter',
      'climate',
      'minCrew',
      'maxCrew',
      'gravity',
      'terrain',
      'surfaceWater',
      'population',
    ])
    filters?: Filtering,
  ) {
    return this.spaceshipsService.findAll(queryParams, filters);
  }

  @Get(':id')
  findOne(@Param() params: FindSpaceshipDto) {
    return this.spaceshipsService.findById(params.id);
  }
}
