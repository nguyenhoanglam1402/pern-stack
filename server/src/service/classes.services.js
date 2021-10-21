const database = require("../../database/models/index");
const { Op } = require("sequelize");
const Class = database.db.Class;
const Course = database.db.Course;
const ListTrainee = database.db.ListTraineeClass;
const Trainee = database.db.Trainee;
const Account = database.db.Account;

const findCourseIDService = async (courseName) => {
  const courseID = await Course.findOne({
    where: {
      name: courseName,
    },
    attributes: ["id"],
  });
  return courseID;
};

const findClassIDServices = async (className) => {
  const result = await Class.findOne({
    where: {
      name: className,
    },
    attributes: ["id"],
  });
  return result.id;
};

const createClassService = async (courseName, name, trainerId) => {
  const courseID = await findCourseIDService(courseName);
  if (courseID === null) {
    return courseID;
  }
  console.log(courseID.id);
  const result = await Class.create({
    courseID: courseID.id,
    trainerID: trainerId,
    name: name,
  });

  return result;
};

const deleteClassService = async (className, trainerID, courseName) => {
  const courseID = await findCourseIDService(courseName);
  const result = await Class.destroy({
    where: {
      trainerID: trainerID,
      name: className,
      courseID: courseID,
    },
  });
  return result;
};

const updateClassService = async (data) => {
  const courseID = await findCourseIDService(data.courseName);
  const result = await Class.update(
    {
      name: data.name,
      courseID: courseID,
      trainerID: data.trainerId,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return result;
};

const getTrainerCoursesService = async (idTrainer) => {
  const result = await Class.findAll({
    attributes: ["courseID"],
    where: {
      trainerID: idTrainer,
    },
    include: [
      {
        model: Course,
        attributes: ["name", "description"],
      },
    ],
  });
  return result;
};

const getListTraineesInClassService = async (idTrainer, className) => {
  const result = await Class.findOne({
    attributes: ["name"],
    where: {
      [Op.and]: [{ trainerID: idTrainer }, { name: className }],
    },
    include: [
      {
        model: ListTrainee,
        attributes: ['classID'],
        include: [
          {
            model: Trainee,
            attributes: ["education", "year"],
            include: [
              {
                model: Account,
                attributes: ["fullname"],
              },
            ],
          },
        ],
      },
    ],
  });
  return result;
};
module.exports = {
  createClassService,
  deleteClassService,
  updateClassService,
  findClassIDServices,
  findCourseIDService,
  getTrainerCoursesService,
  getListTraineesInClassService,
};
