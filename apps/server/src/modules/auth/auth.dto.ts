import type { AuthTokens, User } from '@vibeline/types';

export interface RegisterRequestDto {
  displayName: string;
  email: string;
  password: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  user: User;
  tokens: AuthTokens;
}
