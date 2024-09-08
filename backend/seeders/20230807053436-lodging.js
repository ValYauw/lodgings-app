'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const seedData = JSON.parse(fs.readFileSync('./data/lodging.json')).map(el => {
      const { name, facility, roomCapacity, imgUrl, authorId, location, price, typeId } = el;
      const createdAt = new Date();
      const updatedAt = new Date();
      return { name, facility, roomCapacity, imgUrl, authorId, location, price, typeId, createdAt, updatedAt };
    });
    await queryInterface.bulkInsert('Lodgings', seedData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Lodgings', null, {});
  }
};
