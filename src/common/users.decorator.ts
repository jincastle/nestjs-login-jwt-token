import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserCurrentDto } from 'src/users/dto/users.current.dto';

//req.user를 커스텀한다는  인터페이스 제공
//    //데코레이터 커스텀(CurrentUser)
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as UserCurrentDto;
  },
);
