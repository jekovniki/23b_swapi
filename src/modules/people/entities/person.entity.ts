import { Planet } from 'src/modules/planets/entities/planet.entity';
import { Gender } from 'src/shared/enums/basic.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
