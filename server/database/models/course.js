"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.CourseCategory, {
        foreignKey: "categoryID",
        onDelete: "CASCADE",
      });
      Course.hasMany(models.Class,{
        foreignKey: "courseID",
        as: "Classes"
      })
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
