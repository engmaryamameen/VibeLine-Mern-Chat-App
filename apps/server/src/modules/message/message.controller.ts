import type { FastifyReply, FastifyRequest } from 'fastify';

import { validate } from '@/utils/validation';

import { messageService } from './message.service';
import { roomParamSchema, sendMessageSchema } from './message.schema';

export const listMessagesHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const params = validate(roomParamSchema, request.params);
  const messages = await messageService.listByRoom(params.roomId);

  return reply.status(200).send({ messages });
};

export const sendMessageHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const params = validate(roomParamSchema, request.params);
  const body = validate(sendMessageSchema, request.body);

  const message = await messageService.send({
    roomId: params.roomId,
    authorId: (request.user as { sub: string }).sub,
    body: body.body
  });

  return reply.status(201).send({ message });
};
