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
      Class.hasMany(models.ListTraineeClass, {
        foreignKey: "classID",
      });
      Class.belongsTo(models.Trainer,{
        foreignKey: "trainerID",
        onDelete: "CASCADE",
      })
    }
  }
  Class.init(
    {
      courseID: DataTypes.INTEGER,
      trainerID: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
