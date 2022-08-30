import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { SubUsersDto } from './dto/subusers.dto';
import { SubUser } from './subusers.entity';

@Injectable()
@UseGuards(JwtAuthGuard)
export class SubusersService {
  constructor(
    @InjectRepository(SubUser)
    private subUsersRepository: Repository<SubUser>,
  ) {}

  async subusercreate(subuser: SubUsersDto): Promise<SubUser> {
    return await this.subUsersRepository.save(subuser);
  }

  async findsubuser(user: User): Promise<any> {
    return await this.subUsersRepository.find({ where: { user: user } });
  }

  async subuserdelete(subuserId: number) {
    return await this.subUsersRepository.findOne({ where: { id: subuserId } });
  }
}
