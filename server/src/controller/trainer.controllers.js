const {getTrainerCoursesService, getListTraineesInClassService} = require('../service/classes.services');


const getTrainerCourses = async (req,res) => {
    const idTrainer = req.params.id;
    if(!idTrainer){
        return res.status(400).json({
            success: false,
            message: "The id trainer cannot empty",
        });
    }
    else{
        try {
            const result = await getTrainerCoursesService(idTrainer);
            return res.status(200).json({
                success: true,
                data: result,
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error,
                message: "Internal server error"
            });
        }
    }
}


const getListTraineesInClass = async (req,res) => {
    const idTrainer = req.params.id;
    console.log(req.query.classname);
    if(!idTrainer){
        return res.status(400).json({
            success: false,
            message: "The id trainer cannot empty",
        })
    }
    else{
        try {
            const result = await getListTraineesInClassService(idTrainer, req.query.classname);
            return res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error,
                message: "Internal server error"
            });
        }
    }
}


const updateTrainerProfile = async (req,res) => {
    
}
module.exports = {getTrainerCourses, getListTraineesInClass}