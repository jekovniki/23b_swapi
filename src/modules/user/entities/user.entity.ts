import { Role } from '../../../modules/auth/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    name: 'role_id',
    type: 'smallint',
    nullable: false,
  })
  roleId: number;

  @ManyToOne(() => Role, { cascade: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    nullable: true,
  })
  refreshToken: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
