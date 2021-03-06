"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trainer.belongsTo(models.Account, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
      Trainer.hasOne(models.Class,{
        foreignKey: "trainerID"
      })
    }
  }
  Trainer.init(
    {
      specialty: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Trainer",
    }
  );
  return Trainer;
};
