"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Courses", {
      fields: ["categoryID"],
      type: "foreign key",
      name: "course_fkey_constraint_category",
      references: {
        table: "CourseCategories",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Courses",
      "course_fkey_constraint_category"
    );
  },
};
