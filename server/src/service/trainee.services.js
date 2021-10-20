const database = require("../../database/models/index");
const Trainee = database.db.Trainee;
const Account = database.db.Account;
const Role = database.db.Role;

const createTraineeService = async (uid, year, education) => {
  const trainee = await Trainee.create({
    id: uid,
    year: year,
    education: education,
  });
};

const searchTraineeService = async (name, age) => {
  const result = await Role.findOne({
    where: {
      name: "Trainee",
    },
    attributes: [],
    include: {
      model: Account,
      where: {
        fullname: name,
        age: age,
      },
      attributes: [["id", "uid"], "fullname", "email", "age"],
      include: {
        model: Trainee,
        attributes: [["year", "expect graduate"], "education"],
      },
    },
  });
  return result;
};

module.exports = { createTraineeService, searchTraineeService };
