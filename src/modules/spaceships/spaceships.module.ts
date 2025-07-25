import { Module } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { SpaceshipsController } from './spaceships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spaceship } from './entities/spaceship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spaceship])],
  controllers: [SpaceshipsController],
  providers: [SpaceshipsService],
  exports: [SpaceshipsService],
})
export class SpaceshipsModule {}
