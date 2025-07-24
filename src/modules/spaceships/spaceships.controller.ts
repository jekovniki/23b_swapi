import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { CreateSpaceshipDto } from './dto/create-spaceship.dto';
import { UpdateSpaceshipDto } from './dto/update-spaceship.dto';

@Controller('spaceships')
export class SpaceshipsController {
  constructor(private readonly spaceshipsService: SpaceshipsService) {}

  @Post()
  create(@Body() createSpaceshipDto: CreateSpaceshipDto) {
    return this.spaceshipsService.create(createSpaceshipDto);
  }

  @Get()
  findAll() {
    return this.spaceshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceshipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceshipDto: UpdateSpaceshipDto) {
    return this.spaceshipsService.update(+id, updateSpaceshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceshipsService.remove(+id);
  }
}
