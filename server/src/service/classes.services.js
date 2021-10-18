const database = require("../../database/models/index");
const Class = database.db.Class;
const Course = database.db.Course;

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
module.exports = {
  createClassService,
  deleteClassService,
  updateClassService,
  findClassIDServices,
};
