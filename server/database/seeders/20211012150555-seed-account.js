"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Accounts", [
      {
        email: "nguyetthiminhbui@gmail.com",
        password: "gogogoyoucanmakeit",
        fullname: "Bui Thi Minh Nguyet",
        rolesID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "tthanhh410@gmail.com",
        password: "dontbesadmybro",
        fullname: "Vo Ngoc Thanh",
        rolesID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "namptgcd19818@fpt.edu.vn",
        password: "respectandregard",
        fullname: "Pham Trung Nam",
        rolesID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "namptgcd19818@fpt.edu.vn",
        password: "respectandregard",
        fullname: "Pham Trung Nam",
        rolesID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Accounts", null, {});
  },
};
