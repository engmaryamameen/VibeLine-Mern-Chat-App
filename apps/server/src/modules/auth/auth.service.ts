import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

import type { AuthTokens, User } from '@vibeline/types';

import { AppError } from '@/common/errors/app-error';
import { env } from '@/config/env';
import { userRepository } from '@/repositories/user.repository';
import { comparePassword, hashPassword } from '@/utils/hash';

import type { LoginRequestDto, RegisterRequestDto } from './auth.dto';

const signTokens = (user: User): AuthTokens => ({
  accessToken: jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
  }),
  refreshToken: jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions['expiresIn']
  })
});

class AuthService {
  async register(payload: RegisterRequestDto) {
    const existing = await userRepository.findByEmail(payload.email);

    if (existing) {
      throw new AppError(409, 'EMAIL_IN_USE', 'Email is already registered');
    }

    const now = new Date().toISOString();
    const user: User = {
      id: randomUUID(),
      email: payload.email,
      displayName: payload.displayName,
      role: 'user',
      createdAt: now
    };

    const passwordHash = await hashPassword(payload.password);
    const createdUser = await userRepository.create({ ...user, passwordHash });

    return {
      user: createdUser,
      tokens: signTokens(createdUser)
    };
  }

  async login(payload: LoginRequestDto) {
    const existing = await userRepository.findByEmail(payload.email);

    if (!existing) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Email or password is invalid');
    }

    const matched = await comparePassword(payload.password, existing.passwordHash);

    if (!matched) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Email or password is invalid');
    }

    const { passwordHash: _, ...user } = existing;
    return {
      user,
      tokens: signTokens(user)
    };
  }
}

export const authService = new AuthService();
