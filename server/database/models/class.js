"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      Class.belongsTo(models.Course, {
        foreignKey: "courseID",
        onDelete: "CASCADE",
      });
      Class.belongsToMany(models.Trainee, {
        through: models.ListTraineeClass,
        foreignKey: "classID",
        onDelete: "CASCADE",
      });
    }
  }
  Class.init(
    {
      courseID: DataTypes.INTEGER,
      trainerID: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
