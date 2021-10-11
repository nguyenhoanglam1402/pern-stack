"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Trainers", {
      fields: ["id"],
      type: "foreign key",
      name: "trainer_fkey_constraint_account",
      references: {
        //Required field
        table: "Accounts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Trainers");
  },
};
