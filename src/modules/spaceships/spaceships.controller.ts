import { Controller, Get, Param } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';

@Controller('spaceships')
export class SpaceshipsController {
  constructor(private readonly spaceshipsService: SpaceshipsService) {}

  @Get()
  findAll() {
    return this.spaceshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceshipsService.findOne(+id);
  }
}
