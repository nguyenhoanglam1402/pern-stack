"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseCategory extends Model {
    static associate(models) {
      CourseCategory.hasMany(models.Course, {
        foreignKey: "categoryID",
        as: "Courses",
      });
    }
  }
  CourseCategory.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CourseCategory",
    }
  );
  return CourseCategory;
};
