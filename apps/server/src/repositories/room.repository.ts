import type { Room } from '@vibeline/types';

import { memoryDb } from '@/repositories/memory-db';

class RoomRepository {
  async list(): Promise<Room[]> {
    return Array.from(memoryDb.rooms.values());
  }

  async findById(id: string): Promise<Room | null> {
    return memoryDb.rooms.get(id) ?? null;
  }

  async create(payload: Room): Promise<Room> {
    memoryDb.rooms.set(payload.id, payload);
    memoryDb.messagesByRoom.set(payload.id, []);
    return payload;
  }
}

export const roomRepository = new RoomRepository();
