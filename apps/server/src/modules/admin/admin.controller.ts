import type { FastifyReply, FastifyRequest } from 'fastify';

import { adminService } from './admin.service';

export const adminUsersHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
  const users = await adminService.listUsers();
  return reply.status(200).send({ users });
};

export const deleteMessageHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const params = request.params as { messageId: string };
  await adminService.removeMessage(params.messageId);
  return reply.status(204).send();
};
