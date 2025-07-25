import { Film } from 'src/modules/films/entities/film.entity';
import { Person } from 'src/modules/people/entities/person.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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

  @Column('varchar', { name: 'swapi_url', nullable: false })
  swapiUrl: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Film)
  @JoinTable({
    name: 'film_starships',
    joinColumn: {
      name: 'starship_id',
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
    name: 'spaceship_pilots',
    joinColumn: {
      name: 'spaceship_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pilot_id',
      referencedColumnName: 'id',
    },
  })
  pilots: Person[];
}
