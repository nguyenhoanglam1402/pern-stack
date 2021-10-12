"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "Trainer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Trainee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Staff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
