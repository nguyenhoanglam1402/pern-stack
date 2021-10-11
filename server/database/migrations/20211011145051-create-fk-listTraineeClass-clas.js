"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("ListTraineeClasses", {
      fields: ["classID"],
      type: "foreign key",
      name: "listTraineeClass_fkey_constraint_class",
      references: {
        //Required field
        table: "Classes",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "ListTraineeClasses",
      "listTraineeClass_fkey_constraint_class"
    );
  },
};
