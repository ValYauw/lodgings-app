'use strict';

const fs = require('fs');
const {encrypt} = require("../helpers/password");

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
    const seedData = JSON.parse(fs.readFileSync('./data/user.json')).map(el => {
      const { username, email, password, role, phoneNumber, address } = el;
      const createdAt = new Date();
      const updatedAt = new Date();

      return { 
        username, email, password: encrypt(password), 
        role, phoneNumber, address, 
        createdAt, updatedAt
      };
    });
    await queryInterface.bulkInsert('Users', seedData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
