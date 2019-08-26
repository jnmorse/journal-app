import express, { Request, Response, Application, Errback } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import { NextFunction } from 'connect';
import { StaticRouterContext } from 'react-router';
import passport from 'passport';
import expressSession, { MemoryStore } from 'express-session';
import mongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';

import { reactRenderer } from './middleware/react-renderer';
import { userRoutes } from './api-routes/user-routes';
import { reduxStoreMiddleware } from './middleware/redux-store';
import { Reducers } from './client/reducers';
import { JournalRoutes } from './api-routes/journal-routes';

const app: Application = express();

const MongoStore = mongoDBStore(expressSession);
dotenv.config();

const notTestEnv = process.env.NODE_ENV !== 'test';
const isDevelopment = process.env.NODE_ENV === 'development';

app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  expressSession({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: new MongoStore({
      uri: process.env.SESSION_URL || '',
      collection: 'sessions'
    }),
    secret: process.env.COOKIE_SECRET || 'MySecret',
    resave: true,
    saveUninitialized: true
  }),
  helmet(),
  compression()
]);

app.use(passport.initialize());
app.use(passport.session());

if (notTestEnv && isDevelopment) {
  app.use(morgan('dev'));
} else if (notTestEnv) {
  app.use(morgan('combined'));
}

app.get('/api/test', (req: Request, res: Response): void => {
  res.json({ message: 'Hello World' });
});

app.use('/api', userRoutes);
app.use('/api', JournalRoutes);

app.use(
  (
    error: Errback,
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    if (error) {
      return res.status(500).send(error);
    }

    return next();
  }
);

app.get('/favicon.ico', (req, res) => {
  res.status(404).send('Not Okay');
});

app.use('/css', express.static('dist/css'));
app.use('/js', express.static('dist/js'));
app.use('/images', express.static('dist/images'));
app.use('/manifest.json', express.static('dist/manifest.json'));
app.get('/robots.txt', (req, res) => {
  res.send('');
});

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});

app.get(
  '*',
  reduxStoreMiddleware(Reducers),
  reactRenderer(),
  (req: Request, res: Response): Response | void => {
    const { context }: { context: StaticRouterContext } = res.locals;

    if (context.url && context.statusCode) {
      return res.redirect(context.statusCode, context.url);
    }

    if (context.statusCode) {
      res.status(context.statusCode);
    }

    const html: string = res.locals.html;

    return res.send(html);
  }
);

export { app };
