"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trainee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
