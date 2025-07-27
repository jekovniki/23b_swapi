import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindSpaceshipDto } from '../spaceships/dto/find-spaceship.dto';

@Controller({
  path: 'species',
  version: '1',
})
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  findAll(@Query() queryParams: PaginationDto) {
    return this.speciesService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param() params: FindSpaceshipDto) {
    return this.speciesService.findById(params.id);
  }
}
