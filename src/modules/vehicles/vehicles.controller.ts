import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindVehicleDto } from './dto/find-vehicle.dto';

@Controller({
  path: 'vehicles',
  version: '1',
})
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  findAll(@Query() queryParams: PaginationDto) {
    return this.vehiclesService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param() params: FindVehicleDto) {
    return this.vehiclesService.findById(params.id);
  }
}
