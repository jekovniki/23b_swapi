import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('spaceships')
export class Spaceship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  model: string;

  @Column('varchar', { nullable: false })
  manufacturer: string;

  @Column('bigint', { nullable: true, name: 'cost_in_credits' })
  costInCredits: number;

  @Column('float', { nullable: true })
  length: number;

  @Column('int', { nullable: true, name: 'max_atmosphering_speed' })
  maxAtmospheringSpeed: number;

  @Column('int', { nullable: true })
  minCrew: number;

  @Column('int', { nullable: true })
  maxCrew: number;

  @Column('int', { nullable: true })
  passengers: number;

  @Column('bigint', { nullable: true, name: 'cargo_capacity' })
  cargoCapacity: number;

  @Column('varchar', { nullable: true })
  consumables: string;

  @Column('float', { nullable: true, name: 'hyperdrive_rating' })
  hyperdriveRating: number;

  @Column('int', { nullable: true })
  mglt: number;

  @Column('varchar', { nullable: true, name: 'starship_class' })
  starshipClass: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
