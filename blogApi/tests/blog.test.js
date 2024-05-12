const request = require('supertest');

const app = require('../app');

const mongoose = require('mongoose');

const Blog = require('../models/Blog');

const User = require('../models/User');



describe('Blog Endpoints', () => {

  let token;

  let userId;



  beforeAll(async () => {

    await mongoose.connect('mongodb+srv://test1:sam12345@test1.t5ytgy8.mongodb.net/?retryWrites=true&w=majority&appName=test1', {

      useNewUrlParser: true,

      useUnifiedTopology: true,

    });



    // Create a user for authentication

    const user = await User.create({

      firstName: 'John',

      lastName: 'Doe',

      email: 'john@example.com',

      password: 'password123',

    });

    userId = user._id;



    // Login user to get token

    const res = await request(app)

      .post('/api/auth/login')

      .send({

        email: 'john@example.com',

        password: 'password123',

      });

    token = res.body.token;

  });



  afterAll(async () => {

    await Blog.deleteMany({});

    await User.deleteMany({});

    await mongoose.connection.close();

  });



  it('should create a new blog', async () => {

    const res = await request(app)

      .post('/api/blogs')

      .set('x-auth-token', token)

      .send({

        title: 'Test Blog',

        description: 'This is a test blog',

        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

        tags: ['test', 'blog'],

      });

    expect(res.statusCode).toEqual(201);

    expect(res.body).toHaveProperty('msg');

  });



  it('should get a list of blogs', async () => {

    const res = await request(app)

      .get('/api/blogs')

      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('docs');

  });



  it('should update an existing blog', async () => {

    // Create a blog

    const blog = await Blog.create({

      title: 'Test Blog',

      description: 'This is a test blog',

      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

      tags: ['test', 'blog'],

      author: userId,

    });



    const res = await request(app)

      .put(`/api/blogs/${blog._id}`)

      .set('x-auth-token', token)

      .send({

        title: 'Updated Test Blog',

      });

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('msg');

  });



  it('should delete an existing blog', async () => {

    // Create a blog

    const blog = await Blog.create({

      title: 'Test Blog',

      description: 'This is a test blog',

      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

      tags: ['test', 'blog'],

      author: userId,

    });



    const res = await request(app)

      .delete(`/api/blogs/${blog._id}`)

      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('msg');

  });

});

      
