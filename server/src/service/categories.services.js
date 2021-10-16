const database = require("../../database/models/index");
const Category = database.db.CourseCategory;

const findAllCategoryService = async () => {
  let allCategory = await Category.findAll();
  return allCategory;
};

const findCategoryByNameService = async (nameToFind) => {
  let category = await Category.findAll({
    where: {
      name: nameToFind,
    },
  });
  return category;
};

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

const updateCategoryService = async (id, data) => {
  let dataUpdated = await Category.update(
    {
      name: data.name,
      description: data.description,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return dataUpdated;
};

const deleteCategoryService = async (name) => {
  console.log(name);
  let deleted = await Category.destroy({
    where: {
      name: name,
    },
  });
  return deleted;
};

module.exports = {
  createNewCategoryService,
  findAllCategoryService,
  findCategoryByNameService,
  updateCategoryService,
  deleteCategoryService,
};
