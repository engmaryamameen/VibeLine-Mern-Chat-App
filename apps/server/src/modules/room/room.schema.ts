import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(2).max(40),
  topic: z.string().max(120).optional()
});
