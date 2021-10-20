const database = require("../../database/models/index");
const Course = database.db.Course;
const Category = database.db.CourseCategory;

const getAllCoursesService = async () => {
  let allCourses = await Course.findAll({
    attributes: ['name', 'description'],
    include: [
      {
        model: Category,
        attributes: ['name']
      }
    ]
  });
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
    attributes: ['name','description'],
    include:[
      {
        model: Category,
        attributes: ['name'],
      }
    ]
  });
  return selectedCourse;
};

const updateCourseService = async (id, data) => {
  const newCategoryName = data.categoryName;
  const newCategoryId = await Category.findOne({
    where: {
      name: newCategoryName,
    },
  });
  const result = await Course.update(
    {
      name: data.name,
      categoryID: newCategoryId.id,
      description: data.description,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return result;
};

const deleteCourseService = async (id) => {
  const result = await Course.destroy({ where: { id: id } });
  return result;
};

module.exports = {
  getAllCoursesService,
  createNewCourseService,
  getAListCoursesByNameService,
  updateCourseService,
  deleteCourseService,
};
