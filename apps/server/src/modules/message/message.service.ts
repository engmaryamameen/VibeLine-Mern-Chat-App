import { AppError } from '@/common/errors/app-error';
import { randomUUID } from 'node:crypto';
import { messageRepository } from '@/repositories/message.repository';
import { roomRepository } from '@/repositories/room.repository';

class MessageService {
  async listByRoom(roomId: string) {
    const room = await roomRepository.findById(roomId);

    if (!room) {
      throw new AppError(404, 'ROOM_NOT_FOUND', 'Room not found');
    }

    return messageRepository.listByRoom(roomId);
  }

  async send(params: { roomId: string; authorId: string; body: string }) {
    const room = await roomRepository.findById(params.roomId);

    if (!room) {
      throw new AppError(404, 'ROOM_NOT_FOUND', 'Room not found');
    }

    return messageRepository.create({
      id: randomUUID(),
      roomId: params.roomId,
      authorId: params.authorId,
      body: params.body,
      createdAt: new Date().toISOString()
    });
  }

  async moderateDelete(messageId: string) {
    const deleted = await messageRepository.deleteById(messageId);

    if (!deleted) {
      throw new AppError(404, 'MESSAGE_NOT_FOUND', 'Message not found');
    }
  }
}

export const messageService = new MessageService();
