const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Authentication Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://test1:sam12345@test1.t5ytgy8.mongodb.net/?retryWrites=true&w=majority&appName=test1', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('msg');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
