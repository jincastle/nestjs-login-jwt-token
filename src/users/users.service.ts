import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from './dto/users.request.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async signUp(body: UserRequestDto) {
    const { email, name, password } = body;
    const isUserExist = (await this.usersRepository.findOne({
      where: {
        email: email,
      },
    }))
      ? true
      : false;
    if (isUserExist) {
      throw new UnauthorizedException('이미 가입한 이메일 입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }

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
