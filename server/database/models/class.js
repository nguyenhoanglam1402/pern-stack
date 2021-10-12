'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.belongsTo(models.Course,{
        foreignKey: "courseID",
        onDelete: "CASCADE"
      })
      Class.belongsToMany(models.Tranee,{
        through: models.ListTraineeClass,
        foreignKey: "classID",
        onDelete: "CASCADE"
      })
    }
  };
  Class.init({
    courseID: DataTypes.INTEGER,
    trainerID: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};