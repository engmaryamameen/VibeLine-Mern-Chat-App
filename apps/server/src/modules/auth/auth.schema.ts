import { z } from 'zod';

export const registerSchema = z.object({
  displayName: z.string().min(2).max(48),
  email: z.string().email(),
  password: z.string().min(8).max(72)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72)
});
