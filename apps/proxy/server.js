/**
 * Dev proxy: subdomain routing for local development
 * - localhost:3000          -> web app (port 3002)
 * - admin.localhost:3000    -> admin app (port 3001)
 * - /v1/*                  -> API server (port 5001) - avoids CORS
 */
import { createServer } from 'node:http';
import { request } from 'node:http';

const WEB_PORT = 3002;
const ADMIN_PORT = 3001;
const API_PORT = 5001;
const PROXY_PORT = 3000;

const server = createServer((clientReq, clientRes) => {
  const host = clientReq.headers.host ?? '';
  const url = clientReq.url ?? '/';
  if (url.startsWith('/v1/') || url === '/v1') {
    const opts = {
      hostname: '127.0.0.1',
      port: API_PORT,
      path: url,
      method: clientReq.method,
      headers: {
        ...clientReq.headers,
        host: `localhost:${API_PORT}`
      }
    };
    const proxy = request(opts, (proxyRes) => {
      clientRes.writeHead(proxyRes.statusCode ?? 200, proxyRes.headers);
      proxyRes.pipe(clientRes);
    });
    proxy.on('error', () => {
      clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
      clientRes.end('Bad Gateway – API server not reachable.');
    });
    clientReq.pipe(proxy);
    return;
  }

  const targetPort = host.startsWith('admin.') ? ADMIN_PORT : WEB_PORT;
  const opts = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: url,
    method: clientReq.method,
    headers: {
      ...clientReq.headers,
      host: `localhost:${targetPort}`
    }
  };

  const proxy = request(opts, (proxyRes) => {
    clientRes.writeHead(proxyRes.statusCode ?? 200, proxyRes.headers);
    proxyRes.pipe(clientRes);
  });

  proxy.on('error', () => {
    clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
    clientRes.end('Bad Gateway – ensure web/admin dev servers are running.');
  });

  clientReq.pipe(proxy);
});

server.listen(PROXY_PORT, '127.0.0.1', () => {
  console.log(`[proxy] http://localhost:${PROXY_PORT}  -> web`);
  console.log(`[proxy] http://admin.localhost:${PROXY_PORT} -> admin`);
  console.log(`[proxy] /v1/* -> API (localhost:${API_PORT})`);
});
