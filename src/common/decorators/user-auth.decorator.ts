import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtUser } from '../interfaces';

export const UserAuth = createParamDecorator(
  (key: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request?.headers?.user_data;
    return user as IJwtUser;
  },
);
