import { Person } from 'src/modules/people/entities/person.entity';
import { Planet } from 'src/modules/planets/entities/planet.entity';
import { Spaceship } from 'src/modules/spaceships/entities/spaceship.entity';
import { Species } from 'src/modules/species/entities/species.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicle.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'film_characters',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'character_id',
      referencedColumnName: 'id',
    },
  })
  characters: Person[];

  @ManyToMany(() => Planet)
  @JoinTable({
    name: 'film_planets',
    joinColumn: {
      name: 'film_id',
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
    name: 'film_starships',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'starship_id',
      referencedColumnName: 'id',
    },
  })
  starships: Spaceship[];

  @ManyToMany(() => Vehicle)
  @JoinTable({
    name: 'film_vehicles',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'vehicle_id',
      referencedColumnName: 'id',
    },
  })
  vehicles: Vehicle[];

  @ManyToMany(() => Species)
  @JoinTable({
    name: 'film_species',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'species_id',
      referencedColumnName: 'id',
    },
  })
  species: Species[];
}
