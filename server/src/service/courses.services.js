const database = require("../../database/models/index");
const Course = database.db.Course;

const getAllCoursesService = async () => {
  let allCourses = await Course.findAll();
  return allCourses;
};

const createNewCourseService = async (body) => {
  await Course.create({
    name: body.name,
    description: body.description,
  });
  return;
};

const getAListCoursesByNameService = async (nameToFind) => {
  let selectedCourse = await Course.findAll({
    where: {
      name: nameToFind,
    },
  });
  return selectedCourse;
};

module.exports = {
  getAllCoursesService,
  createNewCourseService,
  getAListCoursesByNameService,
};
