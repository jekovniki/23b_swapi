import { Film } from '../../films/entities/film.entity';
import { Person } from '../../people/entities/person.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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

  @Column('varchar', { name: 'swapi_url', nullable: false })
  swapiUrl: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Film)
  @JoinTable({
    name: 'film_planets',
    joinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
  })
  films: Film[];

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'planet_residents',
    joinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'resident_id',
      referencedColumnName: 'id',
    },
  })
  residents: Person[];
}
