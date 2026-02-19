import type { FastifyInstance } from 'fastify';

import { AppError } from '@/common/errors/app-error';

export const registerErrorHandler = (app: FastifyInstance) => {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      request.log.warn({ err: error, code: error.code }, 'application error');
      return reply.status(error.statusCode).send({
        code: error.code,
        message: error.message
      });
    }

    const unknownError = error as Error;
    request.log.error({ err: unknownError }, 'unhandled error');
    return reply.status(500).send({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unexpected server error'
    });
  });
};
