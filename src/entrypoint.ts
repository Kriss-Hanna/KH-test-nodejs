import { createServer, Server } from 'http';
import { AddressInfo } from 'net';

import 'dotenv/config';

import application from './application';

const server: Server = createServer(application);
server
  .listen({ host: process.env.APP_HOST, port: process.env.APP_PORT })
  .on('listening', () => {
    const adressInfo: string | AddressInfo = server.address();
    console.log(
      `🚀 HTTP Server started on http://${
        typeof adressInfo === 'string'
          ? adressInfo
          : `${adressInfo.address}:${adressInfo.port}`
      }`
    );
  })
  .on(
    'error',
    (
      err: Error & {
        address?: string;
        code: 'EACCES' | 'EADDRINUSE' | 'ECONNRESET';
        port?: number;
      }
    ) => {
      switch (err.code) {
        case 'EACCES':
          console.log('Permission denied');
          break;
        case 'EADDRINUSE':
          console.log(`Address in use (http://${err.address}:${err.port})`);
          break;
        case 'ECONNRESET':
          console.log('Connection reset by peer');
          break;
        default:
          console.log(err);
      }
      server.close();
    }
  )
  .on('close', () => {
    process.exit(1);
  });

process.on('uncaughtException', e => {
  console.error('Uncaught Exception', e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  console.error('Unhandled Rejection', e);
  process.exit(1);
});
