import type { Room } from '@vibeline/types';
import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { rooms } from '@/db/schema';

const rowToRoom = (row: { id: string; name: string; topic: string | null; memberCount: number; createdAt: Date }): Room => ({
  id: row.id,
  name: row.name,
  topic: row.topic ?? undefined,
  memberCount: row.memberCount,
  createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt)
});

class RoomRepository {
  async list(): Promise<Room[]> {
    const rows = await db.query.rooms.findMany();
    return rows.map(rowToRoom);
  }

  async findById(id: string): Promise<Room | null> {
    const row = await db.query.rooms.findFirst({ where: eq(rooms.id, id) });
    return row ? rowToRoom(row) : null;
  }

  async create(payload: Room): Promise<Room> {
    const [row] = await db
      .insert(rooms)
      .values({
        id: payload.id,
        name: payload.name,
        topic: payload.topic ?? null,
        memberCount: payload.memberCount ?? 0
      })
      .returning();

    if (!row) throw new Error('Failed to create room');
    return rowToRoom(row);
  }
}

export const roomRepository = new RoomRepository();
