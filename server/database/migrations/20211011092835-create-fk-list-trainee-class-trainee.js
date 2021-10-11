"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("ListTraineeClasses", {
      fields: ["traineeID"],
      type: "foreign key",
      name: "listTraineeClass_fkey_constraint_trainee",
      references: {
        table: "Trainees",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "ListTraineeClasses",
      "listTraineeClass_fkey_constraint_trainee"
    );
  },
};
