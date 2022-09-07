import { PickType } from '@nestjs/swagger';
import { SubUser } from '../subusers.entity';

export class SubUsersDto extends PickType(SubUser, ['name'] as const) {}
