import { Injectable } from '@nestjs/common';
import { CreateSpaceshipDto } from './dto/create-spaceship.dto';
import { UpdateSpaceshipDto } from './dto/update-spaceship.dto';

@Injectable()
export class SpaceshipsService {
  create(createSpaceshipDto: CreateSpaceshipDto) {
    return 'This action adds a new spaceship';
  }

  findAll() {
    return `This action returns all spaceships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spaceship`;
  }

  update(id: number, updateSpaceshipDto: UpdateSpaceshipDto) {
    return `This action updates a #${id} spaceship`;
  }

  remove(id: number) {
    return `This action removes a #${id} spaceship`;
  }
}
