import type { FastifyReply, FastifyRequest } from 'fastify';

import { validate } from '@/utils/validation';

import { authService } from './auth.service';
import { loginSchema, registerSchema } from './auth.schema';

export const registerHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const payload = validate(registerSchema, request.body);
  const result = await authService.register(payload);

  return reply.status(201).send(result);
};

export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const payload = validate(loginSchema, request.body);
  const result = await authService.login(payload);

  return reply.status(200).send(result);
};
