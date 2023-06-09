import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type MetaType = {
  IP: string;
  userAgent: string;
  metaInfo: string;
};

export const Meta = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const IP = request.ip;
    const userAgent = request.headers['user-agent'];
    const metaInfo = request.body.meta;

    return {
      IP,
      userAgent,
      metaInfo,
    };
  },
);
