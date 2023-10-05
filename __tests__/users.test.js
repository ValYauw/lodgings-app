const request = require('supertest');
const app = require('../app');
const { encrypt } = require('../helpers/password'); 
const { sequelize } = require('../models');

const dummyDate = new Date('01-01-2020');

beforeAll(async () => {
  const users = [
    {
      username: "Admin Joe",
      email: "admin@mail.com",
      password: encrypt("admin"),
      role: "Admin",
      phoneNumber: "081123451",
      address: "Somewhere in Greenville",
      createdAt: dummyDate,
      updatedAt: dummyDate
    },
    {
      username: "John Doe",
      email: "user1@mail.com",
      password: encrypt("password"),
      role: "User",
      phoneNumber: "081123451",
      address: "Perumahan New Jersey",
      createdAt: dummyDate,
      updatedAt: dummyDate
    },
    {
      username: "Jane Doe",
      email: "user2@mail.com",
      password: encrypt("swordfish"),
      role: "User",
      phoneNumber: "081123452",
      address: "Perumahan New York",
      createdAt: dummyDate,
      updatedAt: dummyDate
    },
    {
      username: "Mary Doe",
      email: "user3@mail.com",
      password: encrypt("12345678"),
      role: "User",
      phoneNumber: "081123453",
      address: "Perumahan Chicago",
      createdAt: dummyDate,
      updatedAt: dummyDate
    }
  ];
  await sequelize.queryInterface.bulkInsert('Users', users);
})

afterAll(async () => {
  ['Users'].forEach(async (tableName) => {
    await sequelize.queryInterface.bulkDelete(tableName, null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    });
  });
})

describe('POST Customer login', () => {

  it('should log the customer in', async () => {
    const response = await request(app)
      .post('/pub/login')
      .send({
        email: 'user1@mail.com',
        password: 'password'
      })
      expect(response.statusCode).toBe(200);
    const { access_token } = response.body;
    expect(access_token).toBeDefined;
  });

  it('should give an invalid response', async () => {
    const response = await request(app)
      .post('/pub/login')
      .send({
        email: 'nomail@mail.com',
        password: 'password'
      })
    expect(response.statusCode).toBe(401);
    const { message } = response.body;
    expect(message).toBeDefined;
    expect(message).toBe('Invalid user/password');
  });

  it('should give an invalid response', async () => {
    const response = await request(app)
      .post('/pub/login')
      .send({
        email: 'user1@mail.com',
        password: 'wrongpass'
      })
    expect(response.statusCode).toBe(401);
    const { message } = response.body;
    expect(message).toBeDefined;
    expect(message).toBe('Invalid user/password');
  });

  it('should give an invalid response', async () => {
    const response = await request(app)
      .post('/pub/login')
      .send({ 
        email: '',
        password: ''
      })
    expect(response.statusCode).toBe(400);
    const { error } = response.body;
    expect(error).toBeDefined;
  });

})

describe('POST Customer register', () => {

  it('should register the customer', async () => {
    const response = await request(app)
      .post('/pub/register')
      .send({
        username: 'Janda Marina',
        email: 'janda.marina@mail.com',
        password: 'admin',
        phoneNumber: '08111123',
        address: 'Perumahan'
      })
    expect(response.statusCode).toBe(201);
    const { message, data } = response.body;
    expect(message).toBeDefined;
    expect(data).toBeDefined;
    expect(data.role).toBe('User');
    expect(data.username).toBe('Janda Marina');
    expect(data.password).toBeUndefined;
  });

  it('should register the customer', async () => {
    const response = await request(app)
      .post('/pub/register')
      .send({
        username: 'Janda Marissa',
        email: 'janda.marissa@mail.com',
        password: 'admin'
      })
    expect(response.statusCode).toBe(201);
    const { message, data } = response.body;
    expect(message).toBeDefined;
    expect(data).toBeDefined;
    expect(data.role).toBe('User');
    expect(data.username).toBe('Janda Marissa');
    expect(data.password).toBeUndefined;
  });

  it('should return Validation Error (empty fields)', async () => {
    const response = await request(app)
      .post('/pub/register')
      .send({ 
        username: 'Johnny Lem'
      })
    expect(response.statusCode).toBe(400);
    const { message, errors, data } = response.body;
    expect(message).toBeDefined;
    expect(message).toBe('Validation Error');
    expect(data).toBeUndefined;
    expect(errors).toBeDefined;
    expect(errors).toContain('Email is required');
    expect(errors).toContain('Password is required');
  });

  it('should return Validation Error (empty fields)', async () => {
    const response = await request(app)
      .post('/pub/register')
      .send({ 
        username: 'Johnny Lem',
        email: '',
        password: ''
      })
    expect(response.statusCode).toBe(400);
    const { message, errors, data } = response.body;
    expect(message).toBeDefined;
    expect(message).toBe('Validation Error');
    expect(data).toBeUndefined;
    expect(errors).toBeDefined;
    expect(errors).toContain('Email is required');
    expect(errors).toContain('Password is required');
  });

  it('should return Validation Error (email is already registered)', async () => {
    const response = await request(app)
      .post('/pub/register')
      .send({ 
        username: 'Johnny Lem',
        email: 'user1@mail.com',
        password: 'somethingelse'
      })
    expect(response.statusCode).toBe(400);
    const { message, errors, data } = response.body;
    expect(message).toBeDefined;
    expect(message).toBe('Validation Error');
    expect(data).toBeUndefined;
    expect(errors).toBeDefined;
    expect(errors).toContain('Email must be unique');
  });

  it('should return Validation Error (email is invalid)', async () => {
    const response = await request(app)
      .post('/pub/register')
      .send({ 
        username: 'Johnny Lem',
        email: 'user1mail.com',
        password: 'somethingelse'
      })
    expect(response.statusCode).toBe(400);
    const { message, errors, data } = response.body;
    expect(message).toBeDefined;
    expect(message).toBe('Validation Error');
    expect(data).toBeUndefined;
    expect(errors).toBeDefined;
    expect(errors).toContain('Email is invalid');
  });

})
