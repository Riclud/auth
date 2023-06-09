import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../user/user.entity';

export type UserType = UserEntity;

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) return request.user.user;
    return null;
  },
);
