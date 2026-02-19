import type { FastifyPluginAsync } from 'fastify';

import { loginHandler, registerHandler } from './auth.controller';

export const authRoutes: FastifyPluginAsync = async (app) => {
  app.post('/register', registerHandler);
  app.post('/login', loginHandler);
};
