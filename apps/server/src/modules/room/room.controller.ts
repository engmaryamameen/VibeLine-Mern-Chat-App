import type { FastifyReply, FastifyRequest } from 'fastify';

import { validate } from '@/utils/validation';

import { createRoomSchema } from './room.schema';
import { roomService } from './room.service';

export const listRoomsHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
  const rooms = await roomService.list();
  return reply.status(200).send({ rooms });
};

export const createRoomHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const payload = validate(createRoomSchema, request.body);
  const room = await roomService.create(payload);

  return reply.status(201).send({ room });
};
