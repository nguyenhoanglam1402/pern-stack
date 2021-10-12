"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Trainers", [
      {
        id: 1,
        specialty: "Computer Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        specialty: "Computer Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Trainers", null, {});
  },
};
