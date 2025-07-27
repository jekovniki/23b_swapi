import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindSpaceshipDto } from './dto/find-spaceship.dto';

@Controller({
  path: 'spaceships',
  version: '1',
})
export class SpaceshipsController {
  constructor(private readonly spaceshipsService: SpaceshipsService) {}

  @Get()
  findAll(@Query() queryParams: PaginationDto) {
    return this.spaceshipsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param() params: FindSpaceshipDto) {
    return this.spaceshipsService.findById(params.id);
  }
}
