import type { User } from '@vibeline/types';

import type { StoredUser } from '@/repositories/memory-db';
import { memoryDb } from '@/repositories/memory-db';

class UserRepository {
  async findByEmail(email: string): Promise<StoredUser | null> {
    return memoryDb.usersByEmail.get(email) ?? null;
  }

  async findById(id: string): Promise<StoredUser | null> {
    return memoryDb.users.get(id) ?? null;
  }

  async list(): Promise<User[]> {
    return Array.from(memoryDb.users.values()).map(({ passwordHash: _, ...user }) => user);
  }

  async create(payload: StoredUser): Promise<User> {
    memoryDb.users.set(payload.id, payload);
    memoryDb.usersByEmail.set(payload.email, payload);
    const { passwordHash: _, ...user } = payload;
    return user;
  }
}

export const userRepository = new UserRepository();
