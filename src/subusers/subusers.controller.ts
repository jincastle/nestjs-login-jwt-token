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

@Controller('subusers')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class SubusersController {
  constructor(private readonly subUserService: SubusersService) {}

  @ApiOperation({ summary: '서브아이디 조회' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @Get()
  subuserFind(@Req() req) {
    return this.subUserService.findsubuser(req.user);
  }

  @ApiOperation({ summary: '서브아이디 생성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @Post()
  create(@Body() subUsersDto: SubUsersDto) {
    return this.subUserService.subusercreate(subUsersDto);
  }

  @ApiOperation({ summary: '서브아이디 삭제' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  delete(@Param('id') subuserId: number) {
    return this.subUserService.subuserdelete(subuserId);
  }
}
