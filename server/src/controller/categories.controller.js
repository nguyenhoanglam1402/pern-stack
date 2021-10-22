const {
  createNewCategoryService,
  findAllCategoryService,
  findCategoryByNameService,
  updateCategoryService,
  deleteCategoryService,
} = require("../service/categories.services.js");

//Find All Category
const findAllCategory = async (req, res) => {
  try {
    const result = await findAllCategoryService();
    return res.status(200).json({
      success: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

//Find Category By Name
const findCategoryByName = async (req, res) => {
  const nameCategory = req.params.name;
  console.log(nameCategory);
  if (!nameCategory) {
    return res.status(400).json({
      message: "Name of category cannot be empty",
    });
  }
  try {
    const result = await findCategoryByNameService(nameCategory);
    if (result.length === 0) {
      return res.status(404).json({
        message: "Not Found",
        data: result,
      });
    }
    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

//Create New Category
const createNewCategory = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name of category cannot be empty",
    });
  } else {
    try {
      const result = await createNewCategoryService(req.body);
      if(result === false){
        return res.status(400).json({
          message: "This category is existed",
          success: false
        });
      }
      return res.status(200).json({
        message: "Created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
        data: {},
      });
    }
  }
};

//Update Category
const updateCategory = async (req, res) => {
  const idCategory = req.params.id;
  if (!idCategory) {
    return res.status(400).json({
      message: "Name of category cannot be empty",
    });
  } else {
    try {
      const result = await updateCategoryService(idCategory, {
        name: req.body.name,
        description: req.body.description,
      });
      if (result===false){
        return res.status(400).json({
          message: "This category is not exist",
          success: false
        });
      }
      return res.status(200).json({
        message: "Success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
        data: {},
      });
    }
  }
};

//Delete category
const deleteCategory = async (req, res) => {
  const nameCategory = req.params.name;
  if (!nameCategory) {
    return res.status(400).json({
      success: true,
      message: "Name of category cannot be empty",
    });
  } else {
    try {
      const result = await deleteCategoryService(nameCategory);
      if(result===false){
        return res.status(400).json({
          message: "This category is not existed",
          success: false
        });
      }
      return res.status(200).json({
        message: true,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
        data: {},
      });
    }
  }
};
module.exports = {
  findAllCategory,
  createNewCategory,
  findCategoryByName,
  updateCategory,
  deleteCategory,
};
