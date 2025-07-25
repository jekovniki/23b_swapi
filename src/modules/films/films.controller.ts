import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  findAll() {
    return 'hi';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'hi id';
  }
}
