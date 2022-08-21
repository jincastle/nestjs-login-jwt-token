import { UserRequestDto } from './dto/users.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return result ? true : false;
  }

  async create(user: UserRequestDto): Promise<User> {
    return await this.usersRepository.save(user);
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
  async findCatByIdWithoutPassword(userId: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    return user;
  }
}
