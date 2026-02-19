import type { Message, Room, User } from '@vibeline/types';

type StoredUser = User & { passwordHash: string };

class MemoryDatabase {
  users = new Map<string, StoredUser>();
  usersByEmail = new Map<string, StoredUser>();
  rooms = new Map<string, Room>();
  messagesByRoom = new Map<string, Message[]>();

  constructor() {
    const now = new Date().toISOString();

    const admin: StoredUser = {
      id: 'u_admin',
      email: 'admin@vibeline.dev',
      displayName: 'Workspace Admin',
      role: 'admin',
      createdAt: now,
      passwordHash: '$2a$12$Q2ffU7Ic4QYq7vDR0JX5x.NQQEu0veYl8ioW3M6wp2fW8Gf2P8mM2'
    };

    const generalRoom: Room = {
      id: 'general',
      name: 'General',
      topic: 'Team announcements and updates',
      memberCount: 1,
      createdAt: now
    };

    this.users.set(admin.id, admin);
    this.usersByEmail.set(admin.email, admin);
    this.rooms.set(generalRoom.id, generalRoom);
    this.messagesByRoom.set(generalRoom.id, []);
  }
}

export const memoryDb = new MemoryDatabase();

export type { StoredUser };
