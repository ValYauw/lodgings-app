const request = require('supertest');
const app = require('../app');
const { sequelize, Bookmark } = require('../models');
const { signToken } = require('../helpers/jwt');

const dummyDate = new Date('01-01-2020');

function getRangeOfNumbers(start, end, increment=1) {
  const arr = [];
  let index = 0;
  for (let i=start; i<=end; i+=increment) {
    arr[index++] = i;
  }
  return arr;
}

let accessToken;

beforeAll(async () => {

  const users = [
    {
      username: "Admin Joe",
      email: "admin@mail.com",
      password: "admin",
      role: "Admin",
      phoneNumber: "081123451",
      address: "Somewhere in Greenville",
      createdAt: dummyDate,
      updatedAt: dummyDate
    },
    {
      username: "John Doe",
      email: "user1@mail.com",
      password: "password",
      role: "User",
      phoneNumber: "081123451",
      address: "Perumahan New Jersey",
      createdAt: dummyDate,
      updatedAt: dummyDate
    },
    {
      username: "Jane Doe",
      email: "user2@mail.com",
      password: "swordfish",
      role: "User",
      phoneNumber: "081123452",
      address: "Perumahan New York",
      createdAt: dummyDate,
      updatedAt: dummyDate
    },
    {
      username: "Mary Doe",
      email: "user3@mail.com",
      password: "12345678",
      role: "User",
      phoneNumber: "081123453",
      address: "Perumahan Chicago",
      createdAt: dummyDate,
      updatedAt: dummyDate
    }
  ];
  const types = [
    { name: 'Apartment', createdAt: dummyDate, updatedAt: dummyDate },
    { name: 'Rumah Sewa', createdAt: dummyDate, updatedAt: dummyDate },
    { name: 'Studio', createdAt: dummyDate, updatedAt: dummyDate },
    { name: 'Kos-kosan', createdAt: dummyDate, updatedAt: dummyDate }
  ];
  const lodgings = [];
  for (let i = 0; i < 50; i++) {
    const name = `foo${i+1}`;
    const facility = `lorem ipsum id #${i+1} dolor sit amet`;
    const roomCapacity = [3, 5, 2, 1].at(i % 4);
    const imgUrl = "https://dummyimage.com/600x400/000/fff";
    const authorId = 1;
    const location = ["Tokyo", "Seoul", "Taiping"].at(i % 3);
    const price = [200_000, 600_000, 320_000, 1000_000, 2300_000, 300_000].at(i % 6);
    const typeId = [1, 2, 3, 4].at(i % 4);
    lodgings.push({
      name, facility, roomCapacity, imgUrl, authorId, location, price, typeId,
      createdAt: dummyDate,
      updatedAt: dummyDate
    });
  }

  await sequelize.queryInterface.bulkInsert('Users', users);
  await sequelize.queryInterface.bulkInsert('Types', types);
  await sequelize.queryInterface.bulkInsert('Lodgings', lodgings);

  accessToken = signToken(
    {id: 2, username: 'John Doe', role: 'User'}, 
    '7d'
  );
  
})

afterAll(async () => {
  ['Users', 'Types', 'Lodgings', 'Histories', 'Bookmarks'].forEach(async (tableName) => {
    await sequelize.queryInterface.bulkDelete(tableName, null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    });
  });
})

it('should add a bookmark for the customer', async () => {
  const response = await request(app)
    .post('/pub/lodgings/5/bookmark')
    .set({ access_token: accessToken });
  expect(response.statusCode).toBe(201);
  const { message } = response.body;
  expect(message).toBeDefined;
  expect(message).toBe('Added bookmark');
});

it('should get one recently added bookmark', async () => {
  const response = await request(app)
    .get('/pub/bookmarks')
    .set({ access_token: accessToken });
  expect(response.statusCode).toBe(200);
  const { message, count, data } = response.body;
  expect(message).toBeDefined;
  expect(count).toBeDefined;
  expect(data).toBeDefined;
  expect(message).toBe('Success to get data');
  expect(count).toBe(1);
  const lodging = data[0];
  expect(lodging.id).toBe(5);
  expect(lodging.name).toBe('foo5');
});

it('should get the first twenty of thirty added bookmarks', async () => {

  const bookmarks = [];
  for (let i=6; i<=34; i++) {
    bookmarks.push({userId: 2, lodgingId: i});
  }
  await Bookmark.bulkCreate(bookmarks);

  const response = await request(app)
    .get('/pub/bookmarks')
    .set({ access_token: accessToken });
  expect(response.statusCode).toBe(200);
  const { message, count, offset, data } = response.body;
  expect(message).toBeDefined;
  expect(count).toBeDefined;
  expect(offset).toBeUndefined;
  expect(data).toBeDefined;
  expect(message).toBe('Success to get data');
  expect(count).toBe(30);
  expect(data.length).toBe(20);
  const expectedBookmarkIds = getRangeOfNumbers(5, 24);
  expect(data.map(el => el.id)).toEqual(expectedBookmarkIds);
});

it('should get the next ten of thirty added bookmarks', async () => {
  const response = await request(app)
    .get('/pub/bookmarks?offset=20')
    .set({ access_token: accessToken });
  expect(response.statusCode).toBe(200);
  const { message, count, offset, data } = response.body;
  expect(message).toBeDefined;
  expect(count).toBeDefined;
  expect(offset).toBeUndefined;
  expect(data).toBeDefined;
  expect(message).toBe('Success to get data');
  expect(count).toBe(30);
  expect(data.length).toBe(10);
  const expectedBookmarkIds = getRangeOfNumbers(25, 34);
  expect(data.map(el => el.id)).toEqual(expectedBookmarkIds);
});

it('should remove one bookmark', async () => {
  let response = await request(app)
    .delete('/pub/lodgings/20/bookmark')
    .set({ access_token: accessToken });
  expect(response.statusCode).toBe(200);
  const { message } = response.body;
  expect(message).toBeDefined;
  expect(message).toBe('Removed bookmark');
  response = await request(app)
    .get('/pub/bookmarks')
    .set({ access_token: accessToken });
  expect(response.body.data.map(el => el.id)).not.toContain(20);
});


it('should fail to add a bookmark for a lodging that doesn\' exist', async () => {  
  const response = await request(app)
    .post('/pub/lodgings/100/bookmark')
    .set({ access_token: accessToken });
  expect(response.statusCode).toBe(404);
  const { message } = response.body;
  expect(message).toBeDefined;
  expect(message).toBe('Lodging with id 100 not found');
})

it('should fail to add a bookmark without logging in', async () => {
  const response = await request(app)
    .post('/pub/lodgings/100/bookmark');
    expect(response.statusCode).toBe(401);
  const { message } = response.body;
  expect(message).toBeDefined;
  expect(message).toBe('Invalid token');
})

it('should fail to add a bookmark with invalid access token', async () => {
  const response = await request(app)
    .post('/pub/lodgings/100/bookmark')
    .set({ access_token: 'avnbvsavjasvvchvchsavchvchvcskavk' });
  expect(response.statusCode).toBe(401);
  const { message } = response.body;
  expect(message).toBeDefined;
  expect(message).toBe('Invalid token');
})