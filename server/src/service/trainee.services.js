const database = require("../../database/models/index");
const Trainee = database.db.Trainee;

const createTraineeService = async (uid, year, education) => {
  const trainee = await Trainee.create({
    id: uid,
    year: year,
    education: education,
  });

  console.log(trainee);
};

module.exports = { createTraineeService };
