"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Accounts", {
      fields: ["rolesID"],
      type: "foreign key",
      name: "account_fkey_constraint_roles",
      references: {
        table: "Roles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Accounts",
      "account_fkey_constraint_roles"
    );
  },
};
