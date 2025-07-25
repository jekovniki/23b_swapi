import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { SwapiSyncService } from './swapi-sync.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), FilmsModule, PeopleModule],
  providers: [JobsService, SwapiSyncService],
  exports: [JobsService, SwapiSyncService],
})
export class JobsModule {}
