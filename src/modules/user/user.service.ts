import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      relations: {
        role: {
          permissions: true,
        },
      },
    });
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.userRepository.update(id, {
      refreshToken,
    });
  }

  async create(input: SignUpDto) {
    const user = this.userRepository.create({
      username: input.email,
      password: input.password,
      roleId: input.roleId,
    });

    await this.userRepository.save(user);
  }
}
