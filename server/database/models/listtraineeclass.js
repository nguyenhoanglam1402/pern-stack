"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ListTraineeClass extends Model {
    static associate(models) {
      ListTraineeClass.belongsTo(models.Trainee, {
        foreignKey: "traineeID",
      });
      ListTraineeClass.belongsTo(models.Class, {
        foreignKey: "classID",
      });
    }
  }
  ListTraineeClass.init(
    {
      classID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      traineeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "ListTraineeClass",
    }
  );
  return ListTraineeClass;
};
