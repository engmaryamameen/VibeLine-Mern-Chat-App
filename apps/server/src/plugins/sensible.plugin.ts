import type { FastifyPluginAsync } from 'fastify';
import fastifySensible from '@fastify/sensible';

const sensiblePlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifySensible);
};

export default sensiblePlugin;
