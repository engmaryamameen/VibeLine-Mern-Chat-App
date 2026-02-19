import type { FastifyServerOptions } from 'fastify';

import { env } from '@/config/env';

export const loggerConfig: FastifyServerOptions['logger'] =
  env.NODE_ENV === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            translateTime: 'SYS:standard'
          }
        }
      }
    : true;
