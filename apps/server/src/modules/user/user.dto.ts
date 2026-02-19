import type { User } from '@vibeline/types';

export interface ProfileResponseDto {
  user: User;
}

export interface UserListResponseDto {
  users: User[];
}
