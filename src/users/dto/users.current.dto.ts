import { OmitType } from '@nestjs/swagger';
import { User } from '../users.entity';

export class UserCurrentDto extends OmitType(User, ['password'] as const) {}
