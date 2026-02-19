export type Role = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: Role;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Room {
  id: string;
  name: string;
  topic?: string;
  memberCount: number;
  createdAt: string;
}

export interface Message {
  id: string;
  roomId: string;
  authorId: string;
  body: string;
  createdAt: string;
  editedAt?: string;
}

export interface RoomMembership {
  roomId: string;
  userId: string;
  joinedAt: string;
}
