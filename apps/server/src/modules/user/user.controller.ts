import type { FastifyReply, FastifyRequest } from 'fastify';

import { userService } from './user.service';

export const getProfileHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const profile = await userService.getProfile((request.user as { sub: string }).sub);
  return reply.status(200).send({ user: profile });
};

export const listUsersHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
  const users = await userService.list();
  return reply.status(200).send({ users });
};
