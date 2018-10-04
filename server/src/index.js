import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import config, { nodeEnv } from './config';
import apiRouter from './api';

const server = express();

server.use(bodyParser.json());

if (nodeEnv === 'development') {
  server.use(morgan('dev'));
}

server.use(express.static(nodeEnv === 'development' ? '../../dist/web/client' : './client'));

server.use('/api', apiRouter);

server.listen(config.port, () => {
  console.info('Express listening on port ', config.port);
});
