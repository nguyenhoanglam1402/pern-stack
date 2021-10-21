"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasOne(models.Trainer, {
        foreignKey: "id",
      });
      Account.hasOne(models.Trainee, {
        foreignKey: "id",
      });
      Account.belongsTo(models.Role, {
        foreignKey: "rolesID",
        onDelete: "CASCADE",
      });
    }
  }
  Account.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      rolesID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
