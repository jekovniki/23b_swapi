// src/jobs/job.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  resource: string;

  @CreateDateColumn()
  createdAt: Date;
}
