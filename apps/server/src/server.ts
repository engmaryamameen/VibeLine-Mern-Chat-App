import 'dotenv/config';

import { env } from '@/config/env';
import { buildApp } from '@/app';
import { registerSocketServer } from '@/websocket/socket.server';

const start = async () => {
  const app = buildApp();

  try {
    await app.listen({
      port: env.PORT,
      host: '0.0.0.0'
    });

    registerSocketServer(app.server, app.log);
    app.log.info(`HTTP and WS listening on :${env.PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
