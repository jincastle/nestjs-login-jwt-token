import { PickType } from '@nestjs/swagger';
import { User } from '../users.entity';

export class UserRequestDto extends PickType(User, [
  'email',
  'name',
  'password',
] as const) {}
