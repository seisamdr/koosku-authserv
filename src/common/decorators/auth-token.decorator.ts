import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;
    return authHeader.replace('Bearer ', '');
  },
);
