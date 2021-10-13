'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert(
      "ListTraineeClasses",
      [
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
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
