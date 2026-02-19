import { roomRepository } from '@/repositories/room.repository';

import type { CreateRoomDto } from './room.dto';

class RoomService {
  async list() {
    return roomRepository.list();
  }

  async create(payload: CreateRoomDto) {
    const room = {
      id: payload.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'),
      name: payload.name,
      topic: payload.topic,
      memberCount: 0,
      createdAt: new Date().toISOString()
    };

    return roomRepository.create(room);
  }
}

export const roomService = new RoomService();
