import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindPlanetDto } from './dto/find-planet.dto';

@Controller({
  path: 'planets',
  version: '1',
})
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  findAll(@Query() queryParams: PaginationDto) {
    return this.planetsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param() params: FindPlanetDto) {
    return this.planetsService.findById(params.id);
  }
}
