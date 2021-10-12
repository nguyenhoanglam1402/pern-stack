'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListTraineeClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ListTraineeClass.hasMany(models.Class,{
        foreignKey: "classID",
        as: "Classes"
      })
      ListTraineeClass.hasMany(models.Trainee,{
        foreignKey: "traineeID",
        as: "Trainees",
      })
    }
  };
  ListTraineeClass.init({
    classID: DataTypes.INTEGER,
    traineeID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ListTraineeClass',
  });
  return ListTraineeClass;
};