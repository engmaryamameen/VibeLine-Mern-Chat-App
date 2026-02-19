import type { FastifyPluginAsync } from 'fastify';
import fastifyCors from '@fastify/cors';

import { env } from '@/config/env';

const corsPlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifyCors, {
    origin: env.CORS_ORIGIN.split(',').map((value: string) => value.trim()),
    credentials: true
  });
};

export default corsPlugin;
