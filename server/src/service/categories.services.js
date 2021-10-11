const database = require("../../database/models/index");
const Category = database.db.CourseCategory;

const findAllCategoryService = async () =>{
  let allCategory = await Category.findAll();
  return allCategory;
}


const findCategoryByNameService = async (nameToFind) => {
  let category = await Category.findAll({
    where: {
      name: nameToFind,
    }
  })
  return category;
}


const createNewCategoryService = async (body) => {
  let newCategory = await Category.create(
    {
      name: body.name,
      description: body.description,
    },
    { fields: ["name", "description"] }
  );
  return newCategory;
};

module.exports = {
  createNewCategoryService,findAllCategoryService,findCategoryByNameService
};
