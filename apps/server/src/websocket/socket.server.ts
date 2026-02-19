import type { Server as HttpServer } from 'node:http';

import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';

import type { FastifyBaseLogger } from 'fastify';
import type { ServerToClientEvents, ClientToServerEvents } from '@vibeline/types';

import { env } from '@/config/env';
import type { ChatIoServer } from '@/websocket/socket.types';

import { attachSocketHandlers } from './socket.handlers';

export const registerSocketServer = (httpServer: HttpServer, logger: FastifyBaseLogger) => {
  const io: ChatIoServer = new Server<ClientToServerEvents, ServerToClientEvents, never, { userId: string }>(httpServer, {
    cors: {
      origin: env.CORS_ORIGIN.split(',').map((value: string) => value.trim())
    },
    transports: ['websocket']
  });

  io.use((socket, next: (error?: Error) => void) => {
    const token = socket.handshake.auth.token;

    if (!token || typeof token !== 'string') {
      return next(new Error('Unauthorized'));
    }

    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
      socket.data.userId = payload.sub;
      return next();
    } catch {
      return next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    attachSocketHandlers(io, socket, logger);
  });

  if (env.REDIS_URL) {
    logger.info('REDIS_URL provided. Add Socket.IO Redis adapter for multi-instance fanout.');
  }
};
