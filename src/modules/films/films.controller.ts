import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindFilmDto } from './dto/find-film.dto';
import { FilmSortingDto } from './dto/film-sorting.dto';
import { FilteringParams } from 'src/shared/decorators/filtering-params.decorator';
import { Filtering } from 'src/shared/interface/basic.interface';

@Controller({
  path: 'films',
  version: '1',
})
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  findAll(
    @Query() queryParams: PaginationDto & FilmSortingDto,
    @FilteringParams([
      'title',
      'director',
      'producer',
      'openingCrawl',
      'episodeId',
    ])
    filters?: Filtering,
  ) {
    return this.filmsService.findAll(queryParams, filters);
  }

  @Get(':id')
  findOne(@Param() params: FindFilmDto) {
    return this.filmsService.findById(params.id);
  }
}
