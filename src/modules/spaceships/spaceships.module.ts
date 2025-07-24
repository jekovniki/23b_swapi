import { Module } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { SpaceshipsController } from './spaceships.controller';

@Module({
  controllers: [SpaceshipsController],
  providers: [SpaceshipsService],
})
export class SpaceshipsModule {}
