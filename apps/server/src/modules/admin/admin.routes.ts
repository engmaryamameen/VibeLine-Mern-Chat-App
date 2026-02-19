import type { FastifyPluginAsync } from 'fastify';

import { adminUsersHandler, deleteMessageHandler } from './admin.controller';

export const adminRoutes: FastifyPluginAsync = async (app) => {
  app.get('/users', { preHandler: [app.authenticate, app.authorize(['admin'])] }, adminUsersHandler);
  app.delete(
    '/moderation/messages/:messageId',
    { preHandler: [app.authenticate, app.authorize(['admin'])] },
    deleteMessageHandler
  );
};
