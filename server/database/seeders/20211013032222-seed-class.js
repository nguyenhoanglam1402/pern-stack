"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Classes", [
      {
        courseID: 1,
        trainerID: 2,
        name: "GCD0803",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseID: 2,
        trainerID: 1,
        name: "GCD0803",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseID: 2,
        trainerID: 1,
        name: "GCD0803",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseID: 3,
        trainerID: 2,
        name: "GCD0803",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
