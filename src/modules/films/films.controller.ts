import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { FindFilmDto } from './dto/find-film.dto';
import { FilmSortingDto } from './dto/film-sorting.dto';
import { FilteringParams } from '../../shared/decorators/filtering-params.decorator';
import { Filtering } from '../../shared/interface/basic.interface';

@Controller({
  path: 'films',
  version: '1',
})
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  findAll(
    @Query() paginationParams: PaginationDto,
    @Query() sortingParams: FilmSortingDto,
    @FilteringParams([
      'title',
      'director',
      'producer',
      'openingCrawl',
      'episodeId',
    ])
    filters?: Filtering[],
  ) {
    return this.filmsService.findAll(paginationParams, sortingParams, filters);
  }

  @Get(':id')
  findOne(@Param() params: FindFilmDto) {
    return this.filmsService.findById(params.id);
  }
}
