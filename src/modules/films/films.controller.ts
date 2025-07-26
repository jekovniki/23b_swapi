import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindFilmDto } from './dto/find-film.dto';

@Controller({
  path: 'films',
  version: '1',
})
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  findAll(@Query() queryParams: PaginationDto) {
    return this.filmsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') params: FindFilmDto) {
    return this.filmsService.findById(params.id);
  }
}
