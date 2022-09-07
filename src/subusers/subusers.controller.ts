import { SubusersService } from './subusers.service';
import {
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/http-exception.fliter';
import { SuccessInterceptor } from 'src/common/success.intercetor';
import { SubUsersDto } from './dto/subusers.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/users.decorator';
import { User } from 'src/users/users.entity';

@Controller('subusers')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class SubusersController {
  constructor(private readonly subUserService: SubusersService) {}

  @ApiOperation({ summary: '서브아이디 조회' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Get()
  async subuserFind(@CurrentUser() user: User) {
    return await this.subUserService.findsubuser(user);
  }

  @ApiOperation({ summary: '서브아이디 생성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post()
  async subuserscreate(
    @Body() body: SubUsersDto,
    @CurrentUser() user: User,
    @Req() request,
  ) {
    console.log(body);
    return await this.subUserService.subusercreate(body, user);
  }

  @ApiOperation({ summary: '서브아이디 삭제' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Delete(':id')
  async delete(@Param('id') subuserId: number) {
    return await this.subUserService.subuserdelete(subuserId);
  }
}
