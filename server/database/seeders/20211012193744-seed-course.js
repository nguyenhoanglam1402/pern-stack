"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Courses", [
      {
        name: "OOP",
        categoryID: 3,
        description:
          "This course will help you enhance your knowledge about Object-Orientate-Programming paradigm and improve your coding skills",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "SQL",
        categoryID: 3,
        description:
          "This course will help you enhance your knowledge about database and data's storage and improve your coding skills",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NonSql",
        categoryID: 3,
        description:
          "This course will help you enhance your knowledge about tree's type database and improve your coding skills",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
