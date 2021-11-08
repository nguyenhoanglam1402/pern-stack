const database = require("../../database/models/index");
const { Op } = require("sequelize");
const Class = database.db.Class;
const Course = database.db.Course;
const ListTrainee = database.db.ListTraineeClass;
const Trainee = database.db.Trainee;
const Trainer = database.db.Trainer;
const Account = database.db.Account;
const { findCourseIDService } = require("./courses.services");
const { getTrainerIdService } = require("./account.services");

const getAllClassServices = async () => {
  const result = await Class.findAll({
    attributes: ["id", "name"],
  });
  return result;
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
  const result = await Class.create({
    courseID: courseID.id,
    trainerID: trainerId,
    name: name,
  });

  return result;
};

const deleteClassService = async (id) => {
  const result = await Class.destroy({
    where: {
      id: id,
    },
  });
  return result;
};

const assignTrainerClassService = async (trainerID, className) => {
  const result = await Class.update(
    { trainerID: trainerID },
    { where: { name: className } }
  );
  return result;
};

const updateClassService = async (data) => {
  const courseID = await findCourseIDService(data.courseName);
  const trainerID = await getTrainerIdService(data.trainerEmail);
  if (trainerID === false) {
    return false;
  }
  const result = await Class.update(
    {
      name: data.name,
      courseID: courseID.dataValues.id,
      trainerID: trainerID,
    },
    {
      where: {
        id: data.id,
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
        attributes: ["classID"],
        include: [
          {
            model: Trainee,
            attributes: ["education", "year"],
            include: [
              {
                model: Account,
                attributes: ["fullname", "id"],
              },
            ],
          },
        ],
      },
    ],
  });
  return result;
};
const getListTraineesByNameInClassService = async (className) => {
  const result = await Class.findOne({
    attributes: ["name"],
    where: {
       name: className,
    },
    include: [
      {
        model: ListTrainee,
        attributes: ["classID"],
        include: [
          {
            model: Trainee,
            attributes: ["education", "year"],
            include: [
              {
                model: Account,
                attributes: ["fullname", "id"],
              },
            ],
          },
        ],
      },
    ],
  });
  return result;
};
const findClassesByCourseService = async (courseId) => {
  const result = await Class.findAll({
    attributes: [
      ["name", "ClassName"],
      ["id", "ClassID"],
    ],
    where: {
      courseID: courseId,
    },
    include: [
      {
        model: Trainer,
        attributes: ["specialty"],
        include: [
          {
            model: Account,
            attributes: ["id", "email", "fullname", "age"],
          },
        ],
      },
      {
        model: Course,
        attributes: ["name"],
      },
      {
        model: ListTrainee,
        attributes: ["classID"],
        include: [
          {
            model: Trainee,
            attributes: ["education", "year"],
            include: [
              {
                model: Account,
                attributes: ["fullname", "id"],
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
  getAllClassServices,
  createClassService,
  assignTrainerClassService,
  deleteClassService,
  updateClassService,
  findClassIDServices,
  getTrainerCoursesService,
  getListTraineesInClassService,
  findClassesByCourseService,
  getListTraineesByNameInClassService
};
