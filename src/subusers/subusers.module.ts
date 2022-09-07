import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { SubusersController } from './subusers.controller';
import { SubUser } from './subusers.entity';
import { SubusersService } from './subusers.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubUser, User])],
  controllers: [SubusersController],
  providers: [SubusersService],
  exports: [SubusersService],
})
export class SubusersModule {}
