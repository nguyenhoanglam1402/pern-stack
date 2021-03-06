"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Trainees", {
      fields: ["id"],
      type: "foreign key",
      name: "trainee_fkey_constraint_account",
      references: {
        table: "Accounts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Trainees",
      "trainee_fkey_constraint_account"
    );
  },
};
