import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    const user = await this.usersRepository.findUserByEmail(email);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('이메일을 확인해 주세요');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호를 확인해 주세요');
    }

    const payload = { email: email, sub: user.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: 'secretKey',
      }),
    };
  }
}
