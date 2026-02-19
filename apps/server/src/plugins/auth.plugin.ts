import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

import type { FastifyPluginAsync } from 'fastify';
import type { Role } from '@vibeline/types';

import { env } from '@/config/env';

const authPlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET
  });

  app.decorate('authenticate', async (request) => {
    await request.jwtVerify();
  });

  app.decorate('authorize', (roles: Role[]) => {
    return async (request, reply) => {
      await request.jwtVerify();
      const role = (request.user as { role: Role }).role;

      if (!roles.includes(role)) {
        reply.status(403).send({
          code: 'FORBIDDEN',
          message: 'Missing required permissions'
        });
      }
    };
  });
};

export default fp(authPlugin);
