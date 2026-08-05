import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE = 'response:message';
export const RESPONSE_OPTS = 'response:opts';

export type ResponseOpts = {
  code?: number;
  message?: string;
  liftToken?: boolean;
};

export const Response = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE, message);

export const ResponseOptions = (opts?: ResponseOpts) =>
  SetMetadata(RESPONSE_OPTS, opts);
