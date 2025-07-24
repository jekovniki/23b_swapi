import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { nullable: false, name: 'opening_crawl' })
  openingCrawl: string;

  @Column('int', { nullable: false, name: 'episode_id' })
  episodeId: number;

  @Column('varchar', { nullable: false })
  director: string;

  @Column('varchar', { nullable: false })
  producer: string;

  @Column({ type: 'varchar', name: 'release_date' })
  releaseDate: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
