import { Controller, Get, Param, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindPersonDto } from './dto/find-person.dto';
import { FilteringParams } from 'src/shared/decorators/filtering-params.decorator';
import { Filtering } from 'src/shared/interface/basic.interface';
import { PeopleSortingDto } from './dto/people-sorting.dto';

@Controller({
  path: 'people',
  version: '1',
})
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  findAll(
    @Query() paginationParams: PaginationDto,
    @Query() sortingParams: PeopleSortingDto,
    @FilteringParams([
      'name',
      'height',
      'mass',
      'hairColor',
      'skinColor',
      'eyeColor',
      'birthYear',
      'gender',
    ])
    filters?: Filtering[],
  ) {
    return this.peopleService.findAll(paginationParams, sortingParams, filters);
  }

  @Get(':id')
  findOne(@Param() params: FindPersonDto) {
    return this.peopleService.findById(params.id);
  }
}
