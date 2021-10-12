"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ListTraineeClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
