import { Film } from 'src/modules/films/entities/film.entity';
import { Person } from 'src/modules/people/entities/person.entity';
import { Planet } from 'src/modules/planets/entities/planet.entity';
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

@Entity('species')
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  classification: string;

  @Column('varchar', { nullable: false })
  designation: string;

  @Column('float', { nullable: true, name: 'average_height' })
  averageHeight: number;

  @Column('varchar', { nullable: false, name: 'skin_colors' })
  skinColors: string;

  @Column('varchar', { nullable: false, name: 'hair_colors' })
  hairColors: string;

  @Column('varchar', { nullable: false, name: 'eye_colors' })
  eyeColors: string;

  @Column('float', { nullable: true, name: 'average_lifespan' })
  averageLifespan: number;

  @Column('varchar', { nullable: true })
  language: string;

  @Column('int', { nullable: true, name: 'homeworld_id' })
  homeworldId: number;

  @ManyToOne(() => Planet, { nullable: true })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planet;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Film)
  @JoinTable({
    name: 'film_species',
    joinColumn: {
      name: 'species_id',
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
    name: 'species_people',
    joinColumn: {
      name: 'species_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'people_id',
      referencedColumnName: 'id',
    },
  })
  people: Person[];
}
