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

export const verifyEmailSchema = z.object({
  token: z.string().min(1)
});

export const resendVerificationSchema = z.object({
  email: z.string().email()
});

export const forgotPasswordSchema = z.object({
  email: z.string().email()
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(72)
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1).optional()
});
