const {
    createNewCategoryService,
    findAllCategoryService,
    findCategoryByNameService
  } = require("../service/categories.services.js");
  
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
  
  const findCategoryByName = async (req,res) =>{
    const nameCategory = req.params.name;
    console.log(nameCategory);
    if(!nameCategory){
      return res.status(400).json({
        message: "Name of category cannot be empty",
      });
    }
    try {
      const result = await findCategoryByNameService(nameCategory);
      if (result.length === 0){
        return res.status(404).json({
          message: "Not Found",
          data: result,
        });
      }
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
  }
  const createNewCategory = async (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Name of category cannot be empty",
      });
    } else {
      try {
        const result = await createNewCategoryService(req.body);
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
  
  module.exports = { findAllCategory,createNewCategory,findCategoryByName };
  