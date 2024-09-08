const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

const dummyDate = new Date('01-01-2020');

function getRangeOfNumbers(start, end, reverse=false, increment=1) {
  const arr = [];
  let index = 0;
  if (reverse) {
    for (let i=start; i>=end; i-=increment) {
      arr[index++] = i;
    }
  } else {
    for (let i=start; i<=end; i+=increment) {
      arr[index++] = i;
    }
  }
  return arr;
}

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
  
})

afterAll(async () => {
  ['Users', 'Types', 'Lodgings', 'Histories'].forEach(async (tableName) => {
    await sequelize.queryInterface.bulkDelete(tableName, null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    });
  });
})

// it('should get types', async () => {
//   const response = await request(app)
//     .get('/pub/types')
//   expect(response.statusCode).toBe(200);
//   const { message, data } = response.body;
//   expect(message).toBeDefined;
//   expect(data).toBeDefined;
//   expect(message).toBe('Success to get data');
//   expect(data.length).toBe(4);
//   const types = data.map(el => el.name);
//   expect(types).toEqual(['Apartment', 'Rumah Sewa', 'Studio', 'Kos-kosan'])
// });

it('should get lodgings (page 1)', async () => {
  const response = await request(app)
    .get('/pub/lodgings')
  expect(response.statusCode).toBe(200);
  const { message, count, offset, data } = response.body;
  expect(message).toBeDefined;
  expect(data).toBeDefined;
  expect(count).toBeDefined;
  expect(offset).toBeUndefined;
  expect(message).toBe('Success to get data');
  expect(data.length).toBe(20);
  expect(count).toBe(50);
  const lodgings = data.map(el => el.id);
  const expectedIds = getRangeOfNumbers(50, 31, true);
  expect(lodgings).toEqual(expectedIds);
});

it('should get lodgings (page 2)', async () => {
  const response = await request(app)
    .get('/pub/lodgings?offset=20')
  expect(response.statusCode).toBe(200);
  const { message, count, offset, data } = response.body;
  expect(message).toBeDefined;
  expect(data).toBeDefined;
  expect(count).toBeDefined;
  expect(offset).toBeDefined;
  expect(message).toBe('Success to get data');
  expect(data.length).toBe(20);
  expect(count).toBe(50);
  expect(offset).toBe(20);
  const lodgings = data.map(el => el.id);
  const expectedIds = getRangeOfNumbers(30, 11, true);
  expect(lodgings).toEqual(expectedIds);
});

it('should get lodgings (page 3)', async () => {
  const response = await request(app)
    .get('/pub/lodgings?offset=40')
  expect(response.statusCode).toBe(200);
  const { message, count, offset, data } = response.body;
  expect(message).toBeDefined;
  expect(data).toBeDefined;
  expect(count).toBeDefined;
  expect(offset).toBeDefined;
  expect(message).toBe('Success to get data');
  expect(data.length).toBe(10);
  expect(count).toBe(50);
  expect(offset).toBe(40);
  const lodgings = data.map(el => el.id);
  const expectedIds = getRangeOfNumbers(10, 1, true);
  expect(lodgings).toEqual(expectedIds);
});

it('should filter lodgings based on title/location/facility', async () => {
  const response = await request(app)
    .get('/pub/lodgings?search=Tokyo')
  expect(response.statusCode).toBe(200);
  const { message, count, offset, data } = response.body;
  expect(message).toBeDefined;
  expect(data).toBeDefined;
  expect(count).toBeDefined;
  expect(offset).toBeUndefined;
  expect(message).toBe('Success to get data');
  expect(data.length).toBe(17);
  expect(count).toBe(17);
  const lodgingIds = data.map(el => el.id);
  const expectedIds = getRangeOfNumbers(49, 1, true, 3);
  expect(lodgingIds).toEqual(expectedIds);
  const lodgingLocations = data.map(el => el.location);
  expect(lodgingLocations.every(el => el === 'Tokyo')).toBe(true);
});

it('should filter lodgings based on price', async () => {
  const response = await request(app)
    .get('/pub/lodgings?maxPrice=500000')
  expect(response.statusCode).toBe(200);
  const { message, count, offset, data } = response.body;
  expect(message).toBeDefined;
  expect(data).toBeDefined;
  expect(count).toBeDefined;
  expect(offset).toBeUndefined;
  expect(message).toBe('Success to get data');
  expect(data.length).toBe(20);
  expect(count).toBe(25);
  expect(data.every(el => el.price <= 500_000)).toBe(true);
});

it('should get the lodging based on the given id', async () => {
  const response = await request(app)
    .get('/pub/lodgings/1')
  expect(response.statusCode).toBe(200);
  const { message, data } = response.body;
  expect(message).toBeDefined;
  expect(data).toBeDefined;
  expect(message).toBe('Success to get data');
  expect(data.id).toBe(1);
  expect(data.name).toBe('foo1');
  expect(data.facility).toBe('lorem ipsum id #1 dolor sit amet');
  expect(data.roomCapacity).toBe(3);
  expect(data.imgUrl).toBe('https://dummyimage.com/600x400/000/fff');
  expect(data.location).toBe('Tokyo');
  expect(data.price).toBe(200_000);
  expect(data.status).toBe("Active");
  expect(data.Type.id).toBe(1);
  expect(data.User.id).toBe(1);
});

describe('GET a specific lodging', () => {

  it('should not get the lodging based on an invalid id', async () => {
    const response = await request(app)
      .get('/pub/lodgings/foo')
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBeDefined;
    expect(response.body.message).toBe('Internal Server Error');
  });
  
  it('should not get a non-existent lodging', async () => {
    const response = await request(app)
      .get('/pub/lodgings/100')
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined;
    expect(response.body.message).toBe('Lodging with id 100 not found');
  });

})
