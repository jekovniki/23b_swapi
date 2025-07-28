import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { FindSpaceshipDto } from '../spaceships/dto/find-spaceship.dto';
import { SpeciesSortingDto } from './dto/species-sorting.dto';
import { FilteringParams } from '../../shared/decorators/filtering-params.decorator';
import { Filtering } from '../../shared/interface/basic.interface';

@Controller({
  path: 'species',
  version: '1',
})
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  findAll(
    @Query() paginationParams: PaginationDto,
    @Query() sortingParams: SpeciesSortingDto,
    @FilteringParams([
      'id',
      'name',
      'classification',
      'designation',
      'averageHeight',
      'skinColors',
      'hairColors',
      'eyeColors',
      'averageLifespan',
      'language',
    ])
    filters?: Filtering[],
  ) {
    return this.speciesService.findAll(
      paginationParams,
      sortingParams,
      filters,
    );
  }

  @Get(':id')
  findOne(@Param() params: FindSpaceshipDto) {
    return this.speciesService.findById(params.id);
  }
}
