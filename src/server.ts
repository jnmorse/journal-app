import http, { Server } from 'http';
import mongoose from 'mongoose';

import 'dotenv/config';

import { app } from './app';

const PORT: number = Number(process.env.PORT) || 3010;

const httpServer: Server = http.createServer(app);

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error('env MONGODB_URL is required to run');
}

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    httpServer.listen(PORT, '0.0.0.0', () => {
      // tslint:disable-next-line: no-console
      console.log(`App Running: http://localhost:${PORT}/`);
    });
  })
  // tslint:disable-next-line: no-console
  .catch(error => console.error(error));
