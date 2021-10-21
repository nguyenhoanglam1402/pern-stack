const database = require("../../database/models/index");
const { findClassIDServices } = require("./classes.services");
const ListTraineeClass = database.db.ListTraineeClass;
const Trainee = database.db.Trainee;
const Account = database.db.Account;
const Course = database.db.Course;
const Class = database.db.Class;

const getAllFriendsService = async (courseName) => {
  console.log(courseName);

  const result = await Course.findAll({
    where: {
      name: courseName,
    },
    attributes: [["name", "Course"]],
    include: [
      {
        model: Class,
        attributes: ["name"],
        include: {
          model: ListTraineeClass,
          attributes: ["classID"],
          include: {
            model: Trainee,
            attributes: ["id"],
            include: {
              model: Account,
              attributes: ["fullname", "email"],
            },
          },
        },
      },
    ],
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

const kickTraineeServices = async (name, age, className) => {
  const traineeResult = await Account.findOne({
    where: {
      fullname: name,
      age: age,
      rolesID: 2,
    },
  });
  const classResult = await Class.findOne({
    where: {
      name: className,
    },
  });
  console.log("Trainee: ", traineeResult);
  await ListTraineeClass.destroy({
    where: {
      traineeID: traineeResult.id,
      classID: classResult.id,
    },
  });
};

module.exports = {
  getAllFriendsService,
  assignTraineeService,
  kickTraineeServices,
};
