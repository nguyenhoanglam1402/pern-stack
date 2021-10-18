"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Trainers", [
      {
        id: "b3835ea02a9a1c9d7780ae6b7b6b0225",
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
