import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserData } from '../../modules/auth/types/auth.type';

export const User = createParamDecorator(
  (
    data: keyof UserData | undefined,
    context: ExecutionContext,
  ): UserData | string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
