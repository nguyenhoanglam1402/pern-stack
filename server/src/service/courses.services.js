const database = require("../../database/models/index");
const Course = database.db.Course;
const Category = database.db.CourseCategory;

const getAllCoursesService = async () => {
  let allCourses = await Course.findAll();
  return allCourses;
};

const createNewCourseService = async (body) => {
  let categoryID = await Category.findOne({
    where: {
      name: body.categoryName,
    },
  });
  if (!categoryID) {
    return null;
  } else {
    let updatedCourse = await Course.create(
      {
        name: body.name,
        categoryID: categoryID.id,
        description: body.description,
      },
      { fields: ["name", "categoryID", "description"] }
    );
    return updatedCourse;
  }
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
