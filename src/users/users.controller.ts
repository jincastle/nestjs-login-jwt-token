import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { SuccessInterceptor } from 'src/common/success.intercetor';
import { HttpExceptionFilter } from 'src/common/http-exception.fliter';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() body: UserRequestDto, @Req() request) {
    console.log(body);
    console.log(request.query);
    return await this.usersService.signUp(body);
  }
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    // console.log(data);
    return this.authService.jwtLogIn(data);
  }
}
