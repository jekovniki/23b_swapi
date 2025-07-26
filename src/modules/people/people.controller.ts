import { Controller, Get, Param, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindPersonDto } from './dto/find-person.dto';

@Controller({
  path: 'people',
  version: '1',
})
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  findAll(@Query() queryParams: PaginationDto) {
    return this.peopleService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param() params: FindPersonDto) {
    return this.peopleService.findById(params.id);
  }
}
