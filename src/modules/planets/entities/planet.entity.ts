import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('planets')
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('int', { nullable: true, name: 'rotation_period' })
  rotationPeriod: number;

  @Column('int', { nullable: true, name: 'orbital_period' })
  orbitalPeriod: number;

  @Column('int', { nullable: true })
  diameter: number;

  @Column('varchar', { nullable: false })
  climate: string;

  @Column('varchar', { nullable: false })
  gravity: string;

  @Column('varchar', { nullable: false })
  terrain: string;

  @Column('varchar', { nullable: false, name: 'surface_water' })
  surfaceWater: string;

  @Column('bigint', { nullable: false })
  population: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
