import type { FastifyInstance } from 'fastify';

import { env } from '@/config/env';
import { adminRoutes } from '@/modules/admin/admin.routes';
import { authRoutes } from '@/modules/auth/auth.routes';
import { messageRoutes } from '@/modules/message/message.routes';
import { roomRoutes } from '@/modules/room/room.routes';
import { userRoutes } from '@/modules/user/user.routes';

export const registerRoutes = (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: `${env.API_PREFIX}/auth` });
  app.register(userRoutes, { prefix: `${env.API_PREFIX}/users` });
  app.register(roomRoutes, { prefix: `${env.API_PREFIX}/rooms` });
  app.register(messageRoutes, { prefix: `${env.API_PREFIX}/rooms` });
  app.register(adminRoutes, { prefix: `${env.API_PREFIX}/admin` });
};
