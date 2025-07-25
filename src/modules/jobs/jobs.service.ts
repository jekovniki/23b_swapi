import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  public async insert(resource: string): Promise<Job> {
    const job = this.jobRepository.create({ resource });
    return await this.jobRepository.save(job);
  }

  public async findLast24Hours(): Promise<Job[]> {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return await this.jobRepository.find({
      where: {
        createdAt: MoreThanOrEqual(twentyFourHoursAgo),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
