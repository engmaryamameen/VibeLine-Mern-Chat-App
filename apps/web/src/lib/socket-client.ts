import { io, type Socket } from 'socket.io-client';

import type { ClientToServerEvents, ServerToClientEvents } from '@vibeline/types';

import { env } from './env';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const connectSocket = (token: string) => {
  if (socket?.connected) {
    return socket;
  }

  socket = io(env.wsUrl, {
    auth: {
      token
    },
    transports: ['websocket']
  }) as Socket<ServerToClientEvents, ClientToServerEvents>;

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
