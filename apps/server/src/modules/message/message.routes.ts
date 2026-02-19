import type { FastifyPluginAsync } from 'fastify';

import { listMessagesHandler, sendMessageHandler } from './message.controller';

export const messageRoutes: FastifyPluginAsync = async (app) => {
  app.get('/:roomId/messages', { preHandler: [app.authenticate] }, listMessagesHandler);
  app.post('/:roomId/messages', { preHandler: [app.authenticate] }, sendMessageHandler);
};
