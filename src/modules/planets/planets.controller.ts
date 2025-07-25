import { Controller, Get, Param } from '@nestjs/common';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  findAll() {
    return 'hi';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'his';
  }
}
