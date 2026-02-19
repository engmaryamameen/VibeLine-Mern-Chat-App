import type { FastifyPluginAsync } from 'fastify';

import { getProfileHandler, listUsersHandler } from './user.controller';

export const userRoutes: FastifyPluginAsync = async (app) => {
  app.get('/me', { preHandler: [app.authenticate] }, getProfileHandler);
  app.get('/', { preHandler: [app.authenticate, app.authorize(['admin'])] }, listUsersHandler);
};
