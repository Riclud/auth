import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenEntity } from '../token/token.entity';

export type TokenType = Omit<TokenEntity, 'userID'>;

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
