import { Module } from '@nestjs/common';
import { SubusersController } from './subusers.controller';
import { SubusersService } from './subusers.service';

@Module({
  controllers: [SubusersController],
  providers: [SubusersService],
})
export class SubusersModule {}
