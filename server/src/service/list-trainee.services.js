const database = require("../../database/models/index");
const { findClassIDServices } = require("./classes.services");
const ListTraineeClass = database.db.ListTraineeClass;
const Trainee = database.db.Trainee;
const Account = database.db.Account;

const getAllFriendsService = async (classId) => {
  const result = await ListTraineeClass.findAll({
    where: {
      classID: classId,
    },
    attributes: ["classID"],
    include: {
      model: Trainee,
      attributes: ["id", "education"],
      include: {
        model: Account,
        attributes: ["fullname", "email"],
      },
    },
  });
  return result;
};

const assignTraineeService = async (traineeID, className) => {
  const classID = await findClassIDServices(className);
  await ListTraineeClass.create({
    classID: classID,
    traineeID: traineeID,
  });
};

module.exports = { getAllFriendsService, assignTraineeService };
