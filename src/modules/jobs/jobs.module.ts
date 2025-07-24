import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { SwapiSynService } from './swapi-sync.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobsService, SwapiSynService],
})
export class JobsModule {}
