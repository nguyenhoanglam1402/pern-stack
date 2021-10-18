const database = require("../../database/models/index");
const {
  findClassIDServices,
  findCourseIDService,
} = require("./classes.services");
const ListTraineeClass = database.db.ListTraineeClass;
const Trainee = database.db.Trainee;
const Account = database.db.Account;
const Course = database.db.Course;
const Class = database.db.Class;

const getAllFriendsService = async (courseName) => {
  console.log(courseName);
  const result = await ListTraineeClass.findAll({
    attributes: ["classID"],
    include: [
      {
        model: Trainee,
        attributes: ["id", "education"],
        include: {
          model: Account,
          attributes: ["fullname", "email"],
        },
      },
      {
        model: Class,
        attributes: ["id", ["name", "className"]],
        include: {
          model: Course,
          where: {
            name: courseName,
          },
          attributes: [["name", "courseName"]],
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

module.exports = { getAllFriendsService, assignTraineeService };
