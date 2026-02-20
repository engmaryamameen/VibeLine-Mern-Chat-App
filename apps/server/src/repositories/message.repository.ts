import type { Message } from '@vibeline/types';
import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { messages } from '@/db/schema';

const rowToMessage = (row: {
  id: string;
  roomId: string;
  authorId: string;
  body: string;
  createdAt: Date;
  editedAt: Date | null;
}): Message => ({
  id: row.id,
  roomId: row.roomId,
  authorId: row.authorId,
  body: row.body,
  createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
  editedAt: row.editedAt ? (row.editedAt instanceof Date ? row.editedAt.toISOString() : String(row.editedAt)) : undefined
});

class MessageRepository {
  async listByRoom(roomId: string): Promise<Message[]> {
    const rows = await db.query.messages.findMany({
      where: eq(messages.roomId, roomId)
    });
    return rows.map(rowToMessage);
  }

  async create(payload: Message): Promise<Message> {
    const [row] = await db
      .insert(messages)
      .values({
        id: payload.id,
        roomId: payload.roomId,
        authorId: payload.authorId,
        body: payload.body
      })
      .returning();

    if (!row) throw new Error('Failed to create message');
    return rowToMessage(row);
  }

  async deleteById(id: string): Promise<boolean> {
    const deleted = await db
      .delete(messages)
      .where(eq(messages.id, id))
      .returning({ id: messages.id });
    return deleted.length > 0;
  }
}

export const messageRepository = new MessageRepository();
