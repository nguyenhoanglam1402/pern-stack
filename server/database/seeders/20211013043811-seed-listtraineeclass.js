"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("ListTraineeClasses", [
      {
        classID: 1,
        traineeID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        classID: 1,
        traineeID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        classID: 2,
        traineeID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        classID: 2,
        traineeID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
