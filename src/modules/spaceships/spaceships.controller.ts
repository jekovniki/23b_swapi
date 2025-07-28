import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { FindSpaceshipDto } from './dto/find-spaceship.dto';
import { SpaceshipsSortingDto } from './dto/spaceship-sorting.dto';
import { FilteringParams } from '../../shared/decorators/filtering-params.decorator';
import { Filtering } from '../../shared/interface/basic.interface';
import { Permission } from '../../shared/decorators/permission.decorator';

@Controller({
  path: 'spaceships',
  version: '1',
})
export class SpaceshipsController {
  constructor(private readonly spaceshipsService: SpaceshipsService) {}

  @Get()
  @Permission('spaceships:READ')
  findAll(
    @Query() paginationParams: PaginationDto,
    @Query() sortingParams: SpaceshipsSortingDto,
    @FilteringParams([
      'name',
      'model',
      'manufacturer',
      'costInCredits',
      'length',
      'maxAtmospheringSpeed',
      'minCrew',
      'maxCrew',
      'passengers',
      'cargoCapacity',
      'consumables',
      'hyperdriveRating',
      'mglt',
      'starshipClass',
    ])
    filters?: Filtering[],
  ) {
    return this.spaceshipsService.findAll(
      paginationParams,
      sortingParams,
      filters,
    );
  }

  @Get(':id')
  @Permission('spaceships:READ')
  findOne(@Param() params: FindSpaceshipDto) {
    return this.spaceshipsService.findById(params.id);
  }
}
