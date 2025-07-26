import { Film } from '../../films/entities/film.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Spaceship } from '../../spaceships/entities/spaceship.entity';
import { Species } from '../../species/entities/species.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Gender } from '../../../shared/dto/basic.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('float', { nullable: true })
  height: number;

  @Column('float', { nullable: true })
  mass: number;

  @Column('varchar', { nullable: true, name: 'hair_color' })
  hairColor: string;

  @Column('varchar', { nullable: true, name: 'skin_color' })
  skinColor: string;

  @Column('varchar', { nullable: true, name: 'eye_color' })
  eyeColor: string;

  @Column('varchar', { nullable: true, name: 'birth_year' })
  birthYear: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column('int', { nullable: true, name: 'homeworld_id' })
  homeworldId: number;

  @ManyToOne(() => Planet, { nullable: true })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planet;

  @Column('varchar', { name: 'swapi_url', nullable: false })
  swapiUrl: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Film)
  @JoinTable({
    name: 'film_characters',
    joinColumn: {
      name: 'character_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
  })
  films: Film[];

  @ManyToMany(() => Species)
  @JoinTable({
    name: 'species_people',
    joinColumn: {
      name: 'people_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'species_id',
      referencedColumnName: 'id',
    },
  })
  species: Species[];

  @ManyToMany(() => Planet)
  @JoinTable({
    name: 'planet_residents',
    joinColumn: {
      name: 'resident_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
  })
  planets: Planet[];

  @ManyToMany(() => Spaceship)
  @JoinTable({
    name: 'spaceship_pilots',
    joinColumn: {
      name: 'pilot_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'spaceship_id',
      referencedColumnName: 'id',
    },
  })
  starships: Spaceship[];

  @ManyToMany(() => Vehicle)
  @JoinTable({
    name: 'vehicle_pilot',
    joinColumn: {
      name: 'pilot_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'vehicle_id',
      referencedColumnName: 'id',
    },
  })
  vehicles: Vehicle[];
}
