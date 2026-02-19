import type { FastifyReply, FastifyRequest } from 'fastify';

import type { Role } from '@vibeline/types';

export const authorizeRoles = (roles: Role[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify();
    const role = (request.user as { role: Role }).role;

    if (!roles.includes(role)) {
      return reply.status(403).send({
        code: 'FORBIDDEN',
        message: 'Missing required permissions'
      });
    }
  };
};
