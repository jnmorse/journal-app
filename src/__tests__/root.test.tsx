import mongoose from 'mongoose';
import React from 'react';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { minify } from 'html-minifier';

import { app } from '../app';
import { App } from '../client/components/App';

let mongoServer: MongoMemoryServer;

describe('server tests', () => {
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoURI: string = await mongoServer.getConnectionString();
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test('route: /', async () => {
    const context = {};

    const response = await request(app).get('/');
    const vendorScriptTag: RegExp = /<script src="\/?js\/vendor\.[a-z0-9]+\.js"><\/script>/gu;
    const mainScriptTag: RegExp = /<script src="\/?js\/main\.[a-z0-9]+\.js"><\/script>/gu;

    const appString: string = renderToString(
      <Router location="/" context={context}>
        <App />
      </Router>
    );

    // the status should be 200
    expect(response.status).toBe(200);
    expect(context).toEqual({});

    // Check that text we expect is returned
    expect(response.text).toEqual(expect.stringContaining('DOCTYPE'));
    expect(response.text).toEqual(expect.stringMatching(vendorScriptTag));
    expect(response.text).toEqual(expect.stringMatching(mainScriptTag));
    expect(response.text).toEqual(
      expect.stringContaining(minify(appString, { collapseWhitespace: true }))
    );
  });
});
