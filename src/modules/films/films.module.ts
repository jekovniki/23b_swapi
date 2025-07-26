import { Global, Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { PeopleModule } from '../people/people.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Film]), PeopleModule],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
