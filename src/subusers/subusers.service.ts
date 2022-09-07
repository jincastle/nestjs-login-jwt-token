import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { SubUsersDto } from './dto/subusers.dto';
import { SubUser } from './subusers.entity';

@Injectable()
export class SubusersService {
  constructor(
    @InjectRepository(SubUser)
    private subUsersRepository: Repository<SubUser>,
  ) {}

  async findsubuser(user: User): Promise<any> {
    return this.subUsersRepository.find({ where: { user: user } });
  }

  async subusercreate(body: SubUsersDto, user: User): Promise<SubUser> {
    const { name } = body;
    console.log(name);
    if (name) {
      throw new UnauthorizedException('이름을 입력해 주세요');
    }
    const subuser = await this.subUsersRepository.save({ name: name, user });

    return subuser;
  }

  async subuserdelete(subuserId: number) {
    const subuser = await this.subUsersRepository.findOne({
      where: { id: subuserId },
    });
    return this.subUsersRepository.remove(subuser);
  }
}
