import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';

import { app } from '../app';

let mongoServer: MongoMemoryServer;

describe('routes: /api', () => {
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

  let token: string;

  test('/signup should return a token if okay', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        username: 'someone',
        email: 'someone@somewhere.com',
        password: 'mypass'
      });

    token = response.text;

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        username: 'someone',
        email: 'someone@somewhere.com'
      })
    );
  });

  test('/signup should not return a token if not okay', async () => {
    const responseOne = await request(app).post('/api/signup');
    const responseTwo = await request(app)
      .post('/api/signup')
      .send({ email: 'otheremail@somewhere.com' });

    expect(responseOne.status).toBe(422);
    expect(responseOne.text).toBe(
      'username, email and/or password are missing'
    );

    expect(responseTwo.status).toBe(422);
    expect(responseTwo.text).toBe(
      'username, email and/or password are missing'
    );
  });

  test('/signin with credintials returns a token', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({
        email: 'someone@somewhere.com',
        password: 'mypass'
      });

    expect(response.text.length).toBeGreaterThan(0);
  });
});
