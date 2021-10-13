"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Trainees", [
      {
        id: 3,
        year: "09.09.1998",
        education: "College",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        year: "09.03.2001",
        education: "College",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Trainees", null, {});
  },
};
