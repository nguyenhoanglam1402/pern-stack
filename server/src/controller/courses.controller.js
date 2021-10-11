const { getAllCoursesService } = require("../service/courses.services.js");
const getAllCourse = async (req,res)=>{
    try{
        const find = getAllCoursesService();

        res.status(200).json({
            "msg": "Success",
            "courses":find,
        });
    }
    catch(error){
        res.status(400).send({
            msg: error
        });
    }
};
const createNewCourse = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(400).send({
            msg: error
        });
    }
}


module.exports = { getAllCourse, createNewCourse };