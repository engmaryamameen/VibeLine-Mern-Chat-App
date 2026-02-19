import type { Server as HttpServer } from 'node:http';

import type { FastifyBaseLogger } from 'fastify';
import type { Server, Socket } from 'socket.io';

import type { ClientToServerEvents, ServerToClientEvents } from '@vibeline/types';

type SocketData = {
  userId: string;
};

export type ChatIoServer = Server<ClientToServerEvents, ServerToClientEvents, never, SocketData>;
export type ChatSocket = Socket<ClientToServerEvents, ServerToClientEvents, never, SocketData>;

export type SocketContext = {
  server: ChatIoServer;
  socket: ChatSocket;
  logger: FastifyBaseLogger;
  httpServer: HttpServer;
};
