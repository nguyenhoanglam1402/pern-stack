const database = require("../../database/models/index");
const { findClassIDServices } = require("./classes.services");
const ListTraineeClass = database.db.ListTraineeClass;
const Trainee = database.db.Trainee;
const Account = database.db.Account;
const Course = database.db.Course;
const Role = database.db.Role;
const Class = database.db.Class;
const { Op } = require("sequelize");

const getAllFriendsService = async (courseName) => {
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

const assignTraineeService = async (emailTrainee, className) => {
  const traineeID = await Account.findOne({
    attributes: ["id"],
    where: {
      email: emailTrainee
    },
    include: [{
      model: Role,
      attributes: ["name"]
    }],
  })
  if(traineeID === null){
    return null;
  }
  else{
    if(traineeID.dataValues.Role.name !== "Trainee"){
      return false;
    }
    const classID = await findClassIDServices(className);
    const checkexist = await ListTraineeClass.findOne({
      attributes: ["classID","traineeID"],
      where: {
        [Op.and]: [{ traineeID: traineeID.id }, { classID: classID }],
      }
    })
    if(checkexist !== null){
      return "existed";
    }
    const result = await ListTraineeClass.create({
      classID: classID,
      traineeID: traineeID.id,
    });
    return result;
  }
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
      [Op.and]: [{traineeID: traineeResult.id},{classID: classResult.id,}]
    },
  });
};

const getCoursesOfTraineeService = async (idTrainee) => {
  const result = await ListTraineeClass.findAll({
    attributes: ["classID"],
    where: {
      traineeID: idTrainee,
    },
    include: [
      {
        model: Class,
        attributes: ["courseID"],
        include: [
          {
            model: Course,
            attributes: ["name", "description"],
          },
        ],
      },
    ],
  });
  return result;
};
module.exports = {
  getAllFriendsService,
  assignTraineeService,
  kickTraineeServices,
  getCoursesOfTraineeService,
};
