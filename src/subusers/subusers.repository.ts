import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { SubUsersDto } from './dto/subusers.dto';
import { SubUser } from './subusers.entity';

@Injectable()
export class SubUsersRepository {
  constructor(
    @InjectRepository(SubUser)
    private subUsersRepository: Repository<SubUser>,
  ) {}

  async subusercreate(subuser: SubUsersDto): Promise<any> {
    return await this.subUsersRepository.save(subuser);
  }

  async findsubuser(user: User): Promise<any> {
    return await this.subUsersRepository.find({ where: { user: user } });
  }
}
