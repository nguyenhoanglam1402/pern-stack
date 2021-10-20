"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.CourseCategory, {
        foreignKey: "categoryID",
        onDelete: "CASCADE",
      });
      Course.hasMany(models.Class, {
        foreignKey: "courseID",
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      categoryID: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
