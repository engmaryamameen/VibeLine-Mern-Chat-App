import type { Message } from '@vibeline/types';

import { memoryDb } from '@/repositories/memory-db';

class MessageRepository {
  async listByRoom(roomId: string): Promise<Message[]> {
    return memoryDb.messagesByRoom.get(roomId) ?? [];
  }

  async create(payload: Message): Promise<Message> {
    const current = memoryDb.messagesByRoom.get(payload.roomId) ?? [];
    memoryDb.messagesByRoom.set(payload.roomId, [...current, payload]);
    return payload;
  }

  async deleteById(id: string): Promise<boolean> {
    for (const [roomId, messages] of memoryDb.messagesByRoom.entries()) {
      const next = messages.filter((message) => message.id !== id);
      if (next.length !== messages.length) {
        memoryDb.messagesByRoom.set(roomId, next);
        return true;
      }
    }

    return false;
  }
}

export const messageRepository = new MessageRepository();
