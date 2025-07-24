import { Injectable } from '@nestjs/common';

@Injectable()
export class SpaceshipsService {
  findAll() {
    return `This action returns all spaceships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spaceship`;
  }
}
