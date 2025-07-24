import { Injectable } from '@nestjs/common';

@Injectable()
export class SpeciesService {
  findAll() {
    return `This action returns all species`;
  }

  findOne(id: number) {
    return `This action returns a #${id} species`;
  }
}
