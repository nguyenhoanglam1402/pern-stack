"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ListTraineeClass extends Model {
    static associate(models) {
      // define association here
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
