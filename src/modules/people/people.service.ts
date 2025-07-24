import { Injectable } from '@nestjs/common';

@Injectable()
export class PeopleService {
  findAll() {
    return `This action returns all people`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }
}
