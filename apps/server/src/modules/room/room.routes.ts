import type { FastifyPluginAsync } from 'fastify';

import { createRoomHandler, listRoomsHandler } from './room.controller';

export const roomRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', { preHandler: [app.authenticate] }, listRoomsHandler);
  app.post('/', { preHandler: [app.authenticate, app.authorize(['admin'])] }, createRoomHandler);
};
