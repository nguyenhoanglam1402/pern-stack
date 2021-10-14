"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trainee extends Model {
    static associate(models) {
      // define association here
      Trainee.belongsTo(models.Account, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      Trainee.belongsToMany(models.Class, {
        through: models.ListTraineeClass,
        foreignKey: "traineeID",
        onDelete: "CASCADE",
      });
      Trainee.hasMany(models.ListTraineeClass);
    }
  }
  Trainee.init(
    {
      year: DataTypes.DATE,
      education: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Trainee",
    }
  );
  return Trainee;
};
