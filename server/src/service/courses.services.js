const database = require('../../database/models/index');
const Course = database.db.Course;

const getAllCoursesService = async () =>{
    let allCourses = await Course.findAll();
    return allCourses;
};

const createNewCourseService = async (body,page,limit) =>{
    await Course.create({
        name: body.name,
        description: body.description
    });
}



module.exports =  { getAllCoursesService, createNewCourseService };