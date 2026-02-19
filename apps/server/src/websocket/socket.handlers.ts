import type { FastifyBaseLogger } from 'fastify';

import { messageService } from '@/modules/message/message.service';

import { socketEvents } from './socket.events';
import type { ChatIoServer, ChatSocket } from './socket.types';

export const attachSocketHandlers = (server: ChatIoServer, socket: ChatSocket, logger: FastifyBaseLogger) => {
  socket.on(socketEvents.ROOM_JOIN, ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on(socketEvents.ROOM_LEAVE, ({ roomId }) => {
    socket.leave(roomId);
  });

  socket.on(socketEvents.MESSAGE_SEND, async ({ roomId, body }) => {
    try {
      const message = await messageService.send({
        roomId,
        body,
        authorId: socket.data.userId
      });

      server.to(roomId).emit(socketEvents.MESSAGE_NEW, message);
    } catch (error) {
      logger.warn({ err: error, roomId }, 'socket message send failed');
    }
  });

  socket.on(socketEvents.TYPING_START, ({ roomId }) => {
    socket.to(roomId).emit(socketEvents.TYPING_UPDATE, {
      roomId,
      userId: socket.data.userId,
      isTyping: true
    });
  });

  socket.on(socketEvents.TYPING_STOP, ({ roomId }) => {
    socket.to(roomId).emit(socketEvents.TYPING_UPDATE, {
      roomId,
      userId: socket.data.userId,
      isTyping: false
    });
  });
};
