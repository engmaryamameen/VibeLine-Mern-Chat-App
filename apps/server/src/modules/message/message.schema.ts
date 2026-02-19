import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.string().trim().min(1).max(4000)
});

export const roomParamSchema = z.object({
  roomId: z.string().min(1)
});
