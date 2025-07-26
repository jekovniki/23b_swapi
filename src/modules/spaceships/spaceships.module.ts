import { Module } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { SpaceshipsController } from './spaceships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spaceship } from './entities/spaceship.entity';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [TypeOrmModule.forFeature([Spaceship]), PeopleModule],
  controllers: [SpaceshipsController],
  providers: [SpaceshipsService],
  exports: [SpaceshipsService],
})
export class SpaceshipsModule {}
