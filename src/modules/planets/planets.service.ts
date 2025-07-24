import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanetsService {
  findAll() {
    return `This action returns all planets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planet`;
  }
}
