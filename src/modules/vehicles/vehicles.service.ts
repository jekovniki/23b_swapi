import { Injectable } from '@nestjs/common';
@Injectable()
export class VehiclesService {
  findAll() {
    return `This action returns all vehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }
}
