import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubusersController } from './subusers.controller';
import { SubUser } from './subusers.entity';
import { SubusersService } from './subusers.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubUser])],
  controllers: [SubusersController],
  providers: [SubusersService],
})
export class SubusersModule {}
