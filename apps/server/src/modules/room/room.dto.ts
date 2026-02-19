import type { Room } from '@vibeline/types';

export interface CreateRoomDto {
  name: string;
  topic?: string;
}

export interface RoomListResponseDto {
  rooms: Room[];
}
