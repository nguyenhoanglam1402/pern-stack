const database = require("../../database/models/index");
const Category = database.db.CourseCategory;

const findAllCategoryService = async () => {
  let allCategory = await Category.findAll();
  return allCategory;
};

const findCategoryByNameService = async (nameToFind) => {
  let category = await Category.findOne({
    where: {
      name: nameToFind,
    },
  });
  return category;
};

const createNewCategoryService = async (body) => {
  const checkCategoryExisted = await Category.findOne({
    where: { name: body.name },
  });
  if (checkCategoryExisted === null) {
    let newCategory = await Category.create(
      {
        name: body.name,
        description: body.description,
      },
      { fields: ["name", "description"] }
    );
    return newCategory;
  } else {
    return false;
  }
};

const updateCategoryService = async (id, data) => {
  const checkCategoryExisted = await Category.findOne({
    where: { id: id },
  });
  if(checkCategoryExisted!==null){
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
  }
  else{
    return false;
  }
  
};

const deleteCategoryService = async (name) => {
  const checkCategoryExisted = await Category.findOne({
    where: { name: name },
  });
  console.log("Here",checkCategoryExisted);
  if (checkCategoryExisted === null) {
    return false;
  }else {
    let deleted = await Category.destroy({
      where: {
        name: name,
      },
    });
    return deleted;
  }
};

module.exports = {
  createNewCategoryService,
  findAllCategoryService,
  findCategoryByNameService,
  updateCategoryService,
  deleteCategoryService,
};
